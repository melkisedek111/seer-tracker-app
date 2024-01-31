import React, { useState } from 'react'
import PositionSection from './PositionSection';
import CreateDepartmentSection from './CreateDepartmentSection';
import WithAuthenticate from './WithAuthenticate';


const SettingsPage = () => {
    const [selectedLink, setSelectedLink] = useState("Positions");
   
    const links = [
        "Positions",
        "Departments"
    ]

    return (
        <section>
            <div className="container max-w-screen-2xl space-y-4 p-8 pt-8">
                <div className="w-full flex items-center justify-between pb-5 border-b">
                    <h2 className="text-4xl font-bold tracking-tight">Settings </h2>
                    <div className="flex items-center space-x-2">
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="w-1/5">
                        <nav className="flex flex-col gap-3">
                            {
                                links.map(item => (
                                    <a href="#" key={item} className={`text-md font-semibold hover:bg-gray-200 py-2 px-4 rounded-md ${selectedLink === item ? "bg-gray-200" : ""}`} onClick={() => setSelectedLink(item)}>{item}</a>
                                ))
                            }
                        </nav>
                    </div>
                    <div className="w-3/6 bg-black-100">
                        {
                            selectedLink === "Positions" ? <PositionSection /> : null
                        }
                        {
                            selectedLink === "Departments" ? <CreateDepartmentSection /> : null
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

const ProtectedSettingPage = WithAuthenticate(SettingsPage);

export default ProtectedSettingPage