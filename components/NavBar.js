import React, { useState } from 'react'
import Link from 'next/link'

import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'
import { MdAccountCircle } from 'react-icons/md'
const NavBar = ({ user, cart, addToCart, removeCart, clearCart, subtl }) => {
    const [dropDown, setDropDown] = useState(false)
    const [toggle, settoggle] = useState(false)

    const toggleDropDown = () => {
        setDropDown(!dropDown)
    }

    const toggleCart = () => {
        settoggle(true)
    }
    const handleClick = () => {
        settoggle(false)
    }
    return (
        <div className='flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md sticky top-0 z-10 bg-white'>

            <div className='logo flex items-center' >
                <div className='mx-2'>
                {dropDown && <div className='absolute right-9 top-10 bg-pink-400 px-5 py-1 rounded-md'>
                <ul className=''>
                    <li className='py-1 hover:text-pink-700 text-sm'>order</li>
                    <li className='py-1 hover:text-pink-700 text-sm'>myaccount</li>
                    <li className='py-1 hover:text-pink-700 text-sm'>logout</li>
                </ul>
            </div>}
                    {user.value && <MdAccountCircle onMouseOver={toggleDropDown} onMouseLeave={toggleDropDown} className='absolute right-16 top-4 right-0 text-xl md:text-2xl cursor-pointer' />}
                   
                    {!user.value && <Link href={"/login"}>
                        <button className='bg-pink-600 px-1 py-1 rounded-md'>login</button>
                    </Link>}
                </div>
                <Link href={"/"} className="mr-1"> <img src="/logo.png" alt="" className="w-40 h-15" /></Link>
            </div>
            <div className='nav'>
                <ul className='flex items-center space-x-5 font-bold md:text-base'>
                    <Link href={"/category/tshirts"}><li className=" hover:text-pink-500">Tshirts</li></Link>
                    <Link href={"/category/hoodies"}><li className=" hover:text-pink-500">Hoodies</li></Link>
                    <Link href={"/category/stickers"}><li className=" hover:text-pink-500">Stickers</li></Link>
                    <Link href={"/category/mugs"}><li className=" hover:text-pink-500">Mugs</li></Link>
                    <Link href={"/category/gift"}><li className=" hover:text-pink-500">Gift</li></Link>
                </ul>
            </div>
            <div onClick={toggleCart} className='cart mx-5 absolute top-4 right-0'>
                <AiOutlineShoppingCart className='text-xl md:text-2xl cursor-pointer' />
            </div>
            {toggle && <div className={`w-72 h-34 sideCart absolute top-0 right-0 bg-pink-100 px-8 py-10 transform transition-transform`} >
                <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
                <span className='absolute top-5 right-2 cursor-pointer text-2xl text-pink-500'><AiFillCloseCircle onClick={handleClick} /></span>
                <ol className='list-decimal font-semibold' >
                    {Object.keys(cart).length == 0 && <div className='my-4 font-semibold'> Your cart is empty !</div>}
                    {Object.keys(cart).map((item) => {
                        return <li key={item}>
                            <div className="item flex my-5">
                                <div className='w-2/3 font-semibold'> {cart[item].name}</div>
                                <div className='flex font-semibold items-center justify-center w-1/3' ><AiFillMinusCircle onClick={() => removeCart(item, 1, cart[item].price, cart[item].size, cart[item].name, cart[item].variant)} className='cursor-pointer text-base text-pink-500' /><span className='mx-2 text-sm'>{cart[item].qyt}</span><AiFillPlusCircle onClick={() => addToCart(item, 1, cart[item].price, cart[item].size, cart[item].name, cart[item].variant)} className='cursor-pointer te xt-base text-pink-500' /></div>
                            </div>
                        </li>
                    })}
                </ol>
                <div className="total font-bold">Subtotal: ₹{subtl}</div>
                <div className="flex mt-5 ">
                    <Link href={"/checkout"}> <button className="flex mx-auto  text-white bg-pink-500 border-0 pr-2 py-1 focus:outline-none hover:bg-pink-600 rounded text-sm"> <BsFillBagCheckFill className='m-1' />checkout</button></Link>

                    <button onClick={clearCart} className="flex mx-auto px-2 text-white bg-pink-500 border-0 pr-2 py-1 focus:outline-none hover:bg-pink-600 rounded text-sm"> Clear Cart</button>
                </div>
            </div>}

        </div>
    )
}

export default NavBar