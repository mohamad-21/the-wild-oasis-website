"use client";

import React from "react";
import { updateGuestAction } from "../actions";
import { useFormStatus } from 'react-dom';
import SpinnerMini from "./SpinnerMini";

function UpdateProfileForm({ guest, children }) {
  // CHANGE
  const { fullName, email, nationality, countryFlag, nationalID } = guest;

  return (
    <form className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col" action={updateGuestAction}>
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          name="fullName"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          defaultValue={fullName}
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          name="email"
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          defaultValue={email}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <img
            src={countryFlag}
            alt="Country flag"
            className="h-5 rounded-sm"
          />
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultValue={nationalID}
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <Submit />
      </div>
    </form>
  )
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300" disabled={pending}>
      {pending ? (<div className="flex items-center gap-3"><SpinnerMini /> Updating...</div>) : 'Update profile'}
    </button>
  )
}

export default UpdateProfileForm;
