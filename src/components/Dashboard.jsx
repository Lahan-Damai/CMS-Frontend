import React from 'react';

function Dashboard() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
                <h1 className="text-3xl font-bold text-center mb-4">Selamat datang pada Dashboard Content Management System (CMS)</h1>
                <p className="text-center text-gray-600">Anda telah berhasil login!</p>
            </div>
        </div>
    );
}

export default Dashboard;
