'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { ArrowLeft, Building, CreditCard, CreditCardIcon, Home, Loader2, LocateFixed, MapPin, Navigation2, Phone, Search, TruckIcon, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/src/redux/store'

import axios from 'axios'

import dynamic from 'next/dynamic'

const CheckoutMap=dynamic(()=>import("@/src/components/CheckoutMap"),{ssr:false})


function CheckOut() {
    const router = useRouter()
    const { userData } = useSelector((state: RootState) => state.user)
    const { subTotal, deliveryFee, finalTotal, cartData } = useSelector((state: RootState) => state.cart)
    const [address, setAddress] = useState({
        fullName: "",
        mobile: "",
        city: "",
        state: "",
        pincode: "",
        fullAddress: ""

    })

    useEffect(() => {
        if (userData) {
            setAddress({
                fullName: userData?.name || "",
                mobile: userData?.mobile || "",
                city: "",
                state: "",
                pincode: "",
                fullAddress: ""
            })
        }
        console.log(userData)
    }, [userData])



    const [searchLoading, setSearchLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">("cod")
    const [position, setPosition] = useState<[number, number] | null>(null)
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const { latitude, longitude } = pos.coords
                setPosition([latitude, longitude])
            }, (err) => { console.log('location error', err) }, { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 })
        }
    }, [])

    const handleSearchQuery = async () => {
        setSearchLoading(true)
        const {OpenStreetMapProvider}=await import("leaflet-geosearch")
        const provider = new OpenStreetMapProvider()
        const results = await provider.search({ query: searchQuery })
        if (results) {
            setSearchLoading(false)
            setPosition([results[0].y, results[0].x])

        }

    }
    useEffect(() => {
        const fetchAddress = async () => {
            if (!position) return

            try {
                const result = await axios.get(
                    `https://nominatim.openstreetmap.org/reverse?lat=${position[0]}&lon=${position[1]}&format=json`
                )

                const addr = result.data.address

                setAddress(prev => ({
                    ...prev,
                    city:
                        addr.city ||
                        addr.town ||
                        addr.village ||
                        addr.city_district ||
                        addr.residential ||
                        "",
                    fullAddress: result.data.display_name || "",
                    state: addr.state || "",
                    pincode: addr.postcode || "",
                    latitude:position[0],
                    longitude:position[1],
                }))
            } catch (error) {
                console.log(error)
            }
        }

        fetchAddress()
    }, [position])



    const handleCod = async () => {

        if (!position) {
            return null
        }

        try {
            const result = await axios.post("/api/user/order", {
                userId: userData?._id,
                items: cartData.map(item => ({
                    grocery: item._id,
                    name: item.name,
                    price: item.price,
                    unit: item.unit,
                    image: item.image,
                    quantity: item.quantity
                })),
                totalAmount: finalTotal,
                address: {
                    fullName: address.fullName,
                    mobile: address.mobile,
                    city: address.city,
                    state: address.state,
                    fullAddress: address.fullAddress,
                    pincode: address.pincode,
                    latitude: position[0],
                    longitude: position[1]
                },
                paymentMethod:"cod"
            })
            router.push("/user/order-success")
            
        } catch (error: any) {
            console.error(error.response?.data)
        }
    }
    //     

    const handleCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const { latitude, longitude } = pos.coords
                setPosition([latitude, longitude])
            }, (err) => { console.log('location error', err) }, { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 })
        }
    }
    return (
        <div className='w-[92%] md:w-[80%] mx-auto py-10 relative'>
            <motion.button
                whileTap={{ scale: 0.97 }}
                className='absolute -left-4 top-4 flex items-center gap-2 text-green-700 hover:text-green-800 hover:bg-green-300 font-semibold px-4 py-2 rounded-full shadow-md hover:shadow-lg'
                onClick={() => router.push("/user/cart")}><ArrowLeft size={16} />
                <span className='hidden md:inline'>Back to cart</span>
            </motion.button>
            <motion.h1
                initial={{
                    opacity: 0, y: 10
                }}
                animate={{
                    opacity: 1, y: 0
                }}
                transition={{
                    duration: 0.3
                }}
                className='text-3xl md:text-4xl font-bold text-green-700 text-center mb-10'>Checkout</motion.h1>
            <div className='grid md:grid-cols-2 gap-8'>
                <motion.div
                    initial={{
                        opacity: 0, x: -20
                    }}
                    animate={{
                        opacity: 1, x: 0
                    }}
                    transition={{
                        duration: 0.5
                    }}
                    className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100'>
                    <h2 className='text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2'><MapPin className='w-5 text-green-700 h-5' />Delivery Address</h2>
                    <div className='space-y-4'>
                        <div className='relative'>
                            <User className='absolute left-3 top-3 text-green-700' size={18} />
                            <input type="text" placeholder='Enter Full Name' value={address.fullName || userData?.name || ""}

                                onChange={(e) =>
                                    setAddress(prev => ({ ...prev, fullName: e.target.value }))
                                }

                                className='pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50' />
                        </div>
                        <div className='relative'>
                            <Phone className='absolute left-3 top-3 text-green-700' size={18} />
                            <input type="tel" placeholder='Enter Mobile number' value={address.mobile || userData?.mobile || ""} onChange={(e) =>
                                setAddress(prev => ({ ...prev, mobile: e.target.value }))
                            } className='pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50' maxLength={10} />
                        </div>
                        <div className='relative'>
                            <Home className='absolute left-3 top-3 text-green-700' size={18} />
                            <input type="text" placeholder='Full Address' value={address.fullAddress} onChange={(e) =>
                                setAddress(prev => ({ ...prev, fullAddress: e.target.value }))
                            } className='pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50' />
                        </div>

                        <div className='grid grid-cols-3 gap-3'>
                            <div className='relative'>
                                <Building className='absolute left-3 top-3 text-green-700' size={18} />
                                <input type="text" placeholder='City' value={address.city}


                                    onChange={(e) =>
                                        setAddress(prev => ({ ...prev, city: e.target.value }))
                                    }


                                    className='pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50' />
                            </div>
                            <div className='relative'>
                                <Navigation2 className='absolute left-3 top-3 text-green-700' size={18} />
                                <input type="text" placeholder='State' value={address.state} onChange={(e) =>
                                    setAddress(prev => ({ ...prev, state: e.target.value }))
                                } className='pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50' />
                            </div>
                            <div className='relative'>
                                <Search className='absolute left-3 top-3 text-green-700' size={18} />
                                <input type="tel" placeholder='Pin Code' value={address.pincode} onChange={(e) =>
                                    setAddress(prev => ({ ...prev, pincode: e.target.value }))
                                } className='pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50' maxLength={6} />
                            </div>
                        </div>
                        <div className='flex gap-2 mt-3'>
                            <input type="text" placeholder='search city or area...' className='flex-1 border rounded-lg p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none'
                                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            <button className='bg-green-600 text-white px-5 rounded-xl hover:bg-green-700 transition-all font-medium' onClick={handleSearchQuery} >{searchLoading ? <Loader2 size={16} className='animate-spin ' /> : "Search"}</button>
                        </div>
                        <div className='relative mt-6 h-82.5 rounded-xl overflow-hidden border border-gray-200 shadow-inner'>
                            {position && <CheckoutMap position={position} setPosition={setPosition}/> }
                            <motion.button
                                whileTap={{ scale: 0.90 }}
                                className='absolute bottom-4 right-4 bg-green-600 text-white shadow-lg rounded-full p-3 hover:bg-green-700 transition-all flex items-center justify-center z-999'
                                onClick={handleCurrentLocation}
                            >
                                <LocateFixed size={22} />
                            </motion.button>
                        </div>
                    </div>

                </motion.div>
                <motion.div
                    initial={{
                        opacity: 0, x: 10
                    }}
                    animate={{
                        opacity: 1, x: 0
                    }}
                    transition={{
                        duration: 0.3
                    }}
                    className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 h-fit'
                >
                    <h2 className='text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2'> <CreditCard className='text-green-600 w-6 h-6' /> Payment Method</h2>
                    <div className='space-y-4 mb-6'>
                        <button className={`flex items-center gap-3 w-full border rounded-lg p-3 transition-all ${paymentMethod === "online" ? "border-green-600 bg-green-100 shadow-sm" : "hover:bg-gray-50"}`} onClick={() => setPaymentMethod("online")}>
                            <CreditCardIcon className='text-green-600' /><span className='font-medium text-gray-700'>Pay Online</span>
                        </button>
                        <button className={`flex items-center gap-3 w-full border rounded-lg p-3 transition-all ${paymentMethod === "cod" ? "border-green-600 bg-green-100 shadow-sm" : "hover:bg-gray-50"}`} onClick={() => setPaymentMethod("cod")}>
                            <TruckIcon className='text-green-600' /><span className='font-medium text-gray-700'>Cash on Delivery</span>
                        </button>

                    </div>
                    <div className='border-t pt-4 text-gray-700 space-y-2 text-sm sm:text-base'>
                        <div className='flex justify-between'>
                            <span className='font-semibold'>Subtotal</span>
                            <span className='font-semibold text-green-600'>₹{subTotal}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span className='font-semibold'>Delivery-fee</span>
                            <span className='font-semibold text-green-600'>₹{deliveryFee}</span>
                        </div>
                        <div className='flex justify-between font-bold text-lg border-t pt-3'>
                            <span className='font-semibold '>Final Total</span>
                            <span className='font-semibold text-green-600'>₹{finalTotal}</span>
                        </div>
                    </div>
                    <motion.button
                        whileTap={{ scale: 0.80 }}
                        className='w-full mt-6 bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition-all font-semibold'
                        onClick={() => {
                            if (paymentMethod == "cod") {
                                handleCod()
                            } else {
                                null
                            }
                        }}
                    >
                        {paymentMethod == "cod" ? "Place Order" : "pay& Place Order"}
                    </motion.button>
                </motion.div>
            </div>
        </div>
    )
}

export default CheckOut
