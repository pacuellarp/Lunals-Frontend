import logo from '/public/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getCategories } from '@services/categoriesService';



export default function Header() {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
    async function fetchCategories() {
        try {
            const response = await getCategories(1);
            setCategories(response); 
        } catch (error) {
            throw error;
        }
    }

    fetchCategories(); 
    }, []);



    return (
        <>
            <header className="bg-white border-b border-gray-300">
                <Link href={{
                    pathname: '/'
                }}>
                    <Image
                        src={logo} width={80} height={80} alt="Logo" className="inline-block hover:underline" quality={100} priority={true}
                    />
                </Link>
                <ul className="hidden md:flex items-center space-x-4">
                    {categories.map(category => (
                        <li key={category.id}>{category.name}</li>
                    ))}
                </ul>
                <figure className="flex items-center space-x-4">
                    <Image 
                        src="https://img.icons8.com/?size=256&id=132&format=png" width={80} height={80} alt="Search" className="icon-search" quality={100}
                    />
                    <Image 
                        src="https://img.icons8.com/?size=256&id=9671&format=png"  width={80} height={80} quality={100} alt="Cart" className="icon-cart"
                    />
                </figure>


            </header>
            <div className="md:hidden">
                <ul className="flex items-center space-x-4">
                    <li>Categoría 1</li>
                    <li>Categoría 2</li>
                </ul>
            </div>
        </>
    );
}