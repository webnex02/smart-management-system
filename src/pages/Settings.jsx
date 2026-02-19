import { useState, useEffect } from "react";

export default function Settings() {
  const [settings, setSettings] = useState({
    companyName: "Webnex",
    logo: "",
    timezone: "GMT+5:30",
    currency: "₹",
    dateFormat: "dd/mm/yyyy",
    darkTheme: true,
    primaryColor: "#4cafef",
    modules: {
      employees: true,
      clients: true,
      tasks: true,
      payments: true,
      attendance: true,
    },
    notifications: {
      email: true,
      browser: false,
    },
  });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("appSettings");
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  // Save to localStorage
  const saveSettings = () => {
    localStorage.setItem("appSettings", JSON.stringify(settings));
    alert("Settings saved!");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (name.startsWith("modules.")) {
        const key = name.split(".")[1];
        setSettings((prev) => ({
          ...prev,
          modules: { ...prev.modules, [key]: checked },
        }));
      } else if (name.startsWith("notifications.")) {
        const key = name.split(".")[1];
        setSettings((prev) => ({
          ...prev,
          notifications: { ...prev.notifications, [key]: checked },
        }));
      } else if (name === "darkTheme") {
        setSettings((prev) => ({ ...prev, darkTheme: checked }));
      }
    } else {
      setSettings((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSettings((prev) => ({ ...prev, logo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="content p-6 bg-bgDark min-h-screen">
      <h2 className="text-2xl text-white font-semibold mb-6">Settings</h2>

      {/* General Settings */}
      <div className="card bg-cardBg p-6 rounded-xl mb-6">
        <h3 className="text-white font-medium mb-4">General Settings</h3>
        <label>
          Company Name:
          <input
            type="text"
            name="companyName"
            value={settings.companyName}
            onChange={handleChange}
          />
        </label>
        <label>
          Logo:
          <input type="file" accept="image/*" onChange={handleLogoUpload} />
        </label>
        {settings.logo && (
          <img
            src={settings.logo}
            alt="Logo Preview"
            style={{ width: "80px", marginTop: "10px", borderRadius: "8px" }}
          />
        )}
        <label>
          Timezone:
          <select name="timezone" value={settings.timezone} onChange={handleChange}>
            <option>GMT</option>
            <option>GMT+5:30</option>
            <option>GMT+1</option>
            <option>GMT-5</option>
          </select>
        </label>
        <label>
          Currency:
          <input
            type="text"
            name="currency"
            value={settings.currency}
            onChange={handleChange}
          />
        </label>
        <label>
          Date Format:
          <select name="dateFormat" value={settings.dateFormat} onChange={handleChange}>
            <option>dd/mm/yyyy</option>
            <option>mm/dd/yyyy</option>
            <option>yyyy-mm-dd</option>
          </select>
        </label>
      </div>

      {/* Theme Settings */}
      <div className="card bg-cardBg p-6 rounded-xl mb-6">
        <h3 className="text-white font-medium mb-4">Theme Settings</h3>
        <label>
          Dark Theme:
          <input
            type="checkbox"
            name="darkTheme"
            checked={settings.darkTheme}
            onChange={handleChange}
          />
        </label>
        <label>
          Primary Color:
          <input
            type="color"
            name="primaryColor"
            value={settings.primaryColor}
            onChange={handleChange}
          />
        </label>
      </div>

      {/* Modules */}
      <div className="card bg-cardBg p-6 rounded-xl mb-6">
        <h3 className="text-white font-medium mb-4">Modules</h3>
        {Object.keys(settings.modules).map((mod) => (
          <label key={mod} style={{ display: "block", marginBottom: "5px" }}>
            <input
              type="checkbox"
              name={`modules.${mod}`}
              checked={settings.modules[mod]}
              onChange={handleChange}
            />
            {" " + mod.charAt(0).toUpperCase() + mod.slice(1)}
          </label>
        ))}
      </div>

      {/* Notifications */}
      <div className="card bg-cardBg p-6 rounded-xl mb-6">
        <h3 className="text-white font-medium mb-4">Notifications</h3>
        {Object.keys(settings.notifications).map((notif) => (
          <label key={notif} style={{ display: "block", marginBottom: "5px" }}>
            <input
              type="checkbox"
              name={`notifications.${notif}`}
              checked={settings.notifications[notif]}
              onChange={handleChange}
            />
            {" " + notif.charAt(0).toUpperCase() + notif.slice(1)}
          </label>
        ))}
      </div>

      {/* Backup */}
      <div className="card bg-cardBg p-6 rounded-xl mb-6">
        <h3 className="text-white font-medium mb-4">Backup / Restore</h3>
        <button
          onClick={() => {
            const data = localStorage.getItem("appSettings");
            if (data) {
              const blob = new Blob([data], { type: "application/json" });
              const link = document.createElement("a");
              link.href = URL.createObjectURL(blob);
              link.download = "settings.json";
              link.click();
            }
          }}
        >
          Export Settings
        </button>
        <input
          type="file"
          accept="application/json"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => {
              localStorage.setItem("appSettings", reader.result);
              setSettings(JSON.parse(reader.result));
              alert("Settings imported!");
            };
            reader.readAsText(file);
          }}
        />
      </div>

      <button
        onClick={saveSettings}
        className="bg-primary text-white py-2 px-4 rounded mb-6"
      >
        Save Settings
      </button>
    </div>
  );
}
