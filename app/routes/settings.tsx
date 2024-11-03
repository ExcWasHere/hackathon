import { json } from "@remix-run/node";
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ArrowLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";

export async function action({ request }) {
  return json({ success: true });
}

export default function Settings() {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [showNotificationSettings, setShowNotificationSettings] =
    useState(true);
  const [showSecuritySettings, setShowSecuritySettings] = useState(true);
  const navigation = useNavigation();
  const actionData = useActionData();
  const isSubmitting = navigation.state === "submitting";
  const navigate = useNavigate();

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token", {
        withCredentials: true,
      });
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      console.log(decoded);
      setName(decoded.name);
    } catch (error) {
      console.error(error);
      navigate("/");
    }
  };

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <div className="min-h-screen bg-amber-50 text-black">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex border-b justify-between items-center border-amber-200 pb-5">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold leading-tight text-amber-900">
                Settings
              </h1>
              <p className="mt-2 text-sm text-amber-600">
                Manage your account settings and preferences
              </p>
            </div>
            <div className="w-max h-max p-3 rounded-full bg-amber-400 hover:scale-105 shadow-md duration-200">
              <a href="dashboard">
                <ArrowLeftIcon className="flex text-amber-600" />
              </a>
            </div>
          </div>

          {/* Profile Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-amber-900 mb-4">
              Profile Information
            </h2>
            <Form method="post" className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-amber-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 p-2 block w-full text-slate-900 bg-slate-200 bg-opacity-50 rounded-md border-amber-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-amber-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="mt-1 p-2 block w-full text-slate-900 bg-slate-200 bg-opacity-50 rounded-md border-amber-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                />
              </div>

              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-amber-700"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  className="mt-1 p-2 block w-full text-slate-900 bg-slate-200 bg-opacity-50 rounded-md border-amber-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                />
              </div>
            </Form>
          </div>

          {/* Notification Settings */}
          <div className="bg-white shadow rounded-lg p-6">
            <button
              onClick={() =>
                setShowNotificationSettings(!showNotificationSettings)
              }
              className="flex justify-between w-full"
            >
              <h2 className="text-xl font-semibold text-amber-900">
                Notification Settings
              </h2>
              <span className="text-amber-500">
                {showNotificationSettings ? "−" : "+"}
              </span>
            </button>

            {showNotificationSettings && (
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-amber-700">
                    Email Notifications
                  </span>
                  <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-amber-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
                    <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-amber-500 shadow ring-0 transition duration-200 ease-in-out" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-amber-700">
                    Push Notifications
                  </span>
                  <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-amber-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
                    <span className="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Security Settings */}
          <div className="bg-white shadow rounded-lg p-6">
            <button
              onClick={() => setShowSecuritySettings(!showSecuritySettings)}
              className="flex justify-between w-full"
            >
              <h2 className="text-xl font-semibold text-amber-900">
                Security Settings
              </h2>
              <span className="text-amber-500">
                {showSecuritySettings ? "−" : "+"}
              </span>
            </button>

            {showSecuritySettings && (
              <div className="mt-4 space-y-4 space-x-6">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                  Change Password
                </button>

                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                  Enable Two-Factor Authentication
                </button>
              </div>
            )}
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
