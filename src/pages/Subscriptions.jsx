import { api } from "@/api/api";
import { axiosInterceptor } from "@/axios/interceptor";
import {
  fetchSubscriptionsError,
  fetchSubscriptionsSuccess,
  subscriptionsLoading,
} from "@/redux/slices/subscriptionsSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

const Subscriptions = () => {
  const dispatch = useDispatch();
  const { data : org } = useSelector(( state ) => state.organisationReducer)
  const {
    data: plans,
    loading,
    error,
  } = useSelector((state) => state.subscriptionReducer);

  async function fetchPlans() {
    try {
      dispatch(subscriptionsLoading());
      const response = await axiosInterceptor.get(api.subscriptions);
      dispatch(fetchSubscriptionsSuccess(response.data.data));
    } catch (error) {
      dispatch(
        fetchSubscriptionsError(
          error?.response?.data?.message || error.message,
        ),
      );
    }
  }

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="min-h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Choose Your Plan</h1>
        <p className="text-gray-500 mt-2">
          Scale your notifications based on your needs
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[300px]">
          <Loader2 className="animate-spin text-gray-600" size={40} />
        </div>
      ) : error ? (
        <div className="text-center text-red-600 font-medium">{error}</div>
      ) : (
        <div className="flex md:grid-cols-3 gap-6 max-w-5xl mx-auto flex-wrap justify-center">
          {plans?.map((plan) => (
            <div
              key={plan.id}
              className="bg-white border rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col"
            >
              <h2 className="text-xl font-bold text-gray-900">
                {plan.plan_name}
              </h2>

              <div className="mt-3">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{plan.price}
                </span>
                <span className="text-gray-500 text-sm"> / month</span>
              </div>

              <div className="mt-5 space-y-2 text-sm text-gray-600">
                <p>📧 Email Rate: {plan.email_rate}</p>
                <p>📩 SMS Rate: {plan.sms_rate}</p>
                <p>🔔 In-App Rate: {plan.in_app_rate}</p>
              </div>

              <button
                className={`mt-6 w-full py-2 rounded-xl font-medium transition
                  ${
                    org.subscription_id !== plan.id
                      ? "bg-black text-white hover:bg-gray-800"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
              >
                { org?.subscription_id === plan.id ? "Current Plan" : "Upgrade"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
