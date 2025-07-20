import React from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import UseAuth from '../../Hooks/UseAuth';
import { format } from 'date-fns';

const MyEarnings = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();

  const { data: earnings = [], isLoading } = useQuery({
    queryKey: ['myEarnings', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure(`/riders/completedParcels?email=${user.email}`);
      return res.data;
    }
  });
 

  const today = format(new Date(), 'yyyy-MM-dd');
  const currentMonth = format(new Date(), 'yyyy-MM');
  const currentYear = format(new Date(), 'yyyy');

  const getIncome = (parcel) => {
    const cost = parseFloat(parcel?.Cost || 0);
    return parcel?.senderServiceCenter === parcel?.receiverServiceCenter
      ? cost * 0.8
      : cost * 0.3;
  };

  const earningsDetails = earnings.reduce(
    (acc, parcel) => {
      const income = getIncome(parcel);
      const deliveredDate = format(new Date(parcel?.delivered_At), 'yyyy-MM-dd');
      const deliveredMonth = deliveredDate.slice(0, 7);
      const deliveredYear = deliveredDate.slice(0, 4);

      acc.total += income;

      if (deliveredDate === today) acc.today += income;
      if (deliveredMonth === currentMonth) acc.month += income;
      if (deliveredYear === currentYear) acc.year += income;

      if (parcel?.isCashedOut) {
        acc.totalCashedOut += income;
      } else {
        acc.due += income;
      }

      return acc;
    },
    {
      total: 0,
      today: 0,
      month: 0,
      year: 0,
      totalCashedOut: 0,
      due: 0,
    }
  );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">📊 My Earnings Summary</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Total Earnings</h3>
            <p className="text-2xl font-bold text-green-700">{earningsDetails.total.toFixed(2)} ৳</p>
          </div>

          <div className="bg-blue-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Today's Earnings</h3>
            <p className="text-2xl font-bold text-blue-700">{earningsDetails.today.toFixed(2)} ৳</p>
          </div>

          <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">This Month</h3>
            <p className="text-2xl font-bold text-yellow-700">{earningsDetails.month.toFixed(2)} ৳</p>
          </div>

          <div className="bg-purple-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">This Year</h3>
            <p className="text-2xl font-bold text-purple-700">{earningsDetails.year.toFixed(2)} ৳</p>
          </div>

          <div className="bg-teal-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Total Cashed Out</h3>
            <p className="text-2xl font-bold text-teal-700">{earningsDetails.totalCashedOut.toFixed(2)} ৳</p>
          </div>

          <div className="bg-red-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Due for Cashout</h3>
            <p className="text-2xl font-bold text-red-700">{earningsDetails.due.toFixed(2)} ৳</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEarnings;
