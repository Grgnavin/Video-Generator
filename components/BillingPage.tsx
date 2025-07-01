"use client";
import { useAuthContext } from '@/app/Provider';
import { creditOptions } from '@/lib/constants';
import React from 'react'

const BillingPage = () => {
   const { user } = useAuthContext();

  return (
    <div className="text-white flex flex-col items-center p-6">
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-4">Credits</h1>
        <div className=" rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-400">1 Credit = 1 Video</p>
          <p className="text-3xl font-bold">{user?.credits} Credits left</p>
          <p className="text-xs text-gray-500 mt-2">
            When your credit balance reaches $0, your Video generation will stop working. Add Credits balance topped up.
          </p>
        </div>

        <h2 className="text-xl font-semibold mb-3">Buy More Credits</h2>

        <div className="space-y-3">
          {creditOptions.map((option) => (
            <div key={option.amount} className="rounded-lg flex justify-between items-center p-3">
              <div className='flex items-center space-x-2'>
                <div className="border border-gray-500 rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-sm font-bold">$</span>
                </div>
                <p className="font-medium">{option.amount} Credits</p>
              </div>
              <button className="bg-white cursor-pointer text-black px-4 py-1 rounded font-semibold hover:bg-gray-200">
                {option.price}$ Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BillingPage