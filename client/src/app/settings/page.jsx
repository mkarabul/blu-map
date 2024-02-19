import Option from "./components/option";

export default function Page() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex-col items-left mb-8">
        <img
          src="/default-pfp.png"
          alt="User Avatar"
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
        <label
          htmlFor="avatar-upload"
          className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-150 ease-in-out"
        >
          Change Avatar
          <input id="avatar-upload" type="file" className="hidden" />
        </label>
      </div>
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>
      <div className="space-y-4">
        <Option
          header="Account"
          context="Privacy, security, change email or number"
        />
        <Option header="Notifications" context="Message & Trip Notifications" />
        <Option
          header="Data & Preferences"
          context="User Data, Preferencesm Downloaded Trips"
        />
        <Option header="Region and Language" context="Region & Language" />
        <Option
          header="Customer Support"
          context="Contact Us, About Us, FAQs"
        />
        <Option header="Log Out" context="Log Out of Account" />
      </div>
    </div>
  );
}
