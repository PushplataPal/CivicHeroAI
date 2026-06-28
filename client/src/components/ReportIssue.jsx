import { useState } from "react";
import axios from "axios";

function ReportIssue() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    severity: "",
    location: "",
      suggestion: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported!");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);

        setFormData((prev) => ({
          ...prev,
          location: `${lat},${lng}`,
        }));
      },
      (error) => {
        console.log(error);
        alert("Unable to fetch location!");
      }
    );
  };

  const handleAICategorize = async () => {
    if (!formData.description) {
      alert("Please enter a description first!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/ai/categorize",
        {
          description: formData.description,
        }
      );

      console.log("AI Response:", res.data);

    setFormData((prev) => ({
  ...prev,
  category: res.data.category,
  severity: res.data.severity,
  suggestion: res.data.suggestion,
}));

      alert("AI Analysis Complete! 🤖");
    } catch (error) {
      console.log(error);
      alert("AI categorization failed!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("severity", formData.severity);
      data.append("location", formData.location);
      data.append("suggestion", formData.suggestion);

      if (formData.image) {
        data.append("image", formData.image);
      }

      const res = await axios.post(
        "http://localhost:5000/api/issues",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Issue Reported Successfully! 🎉");
      console.log(res.data);

      setFormData({
        title: "",
        description: "",
        category: "",
        severity: "",
        location: "",
        image: null,
      });
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h1>Report Community Issue 🚨</h1>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Issue Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
        />

        <br /><br />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Describe the issue..."
          value={formData.description}
          onChange={handleChange}
          rows="5"
          cols="40"
        />

        <br /><br />

        {/* AI Button */}
        <button type="button" onClick={handleAICategorize}>
         
          Auto Detect with AI 🤖
           className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        </button>

        <br /><br />

        {/* Category */}
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          readOnly
        />

        <br /><br />

        {/* Severity */}
        <input
          type="text"
          name="severity"
          placeholder="Severity"
          value={formData.severity}
          readOnly
        />

        <br /><br />
        <br /><br />

<textarea
  placeholder="AI Resolution Suggestion"
  value={formData.suggestion}
  readOnly
  rows="4"
  cols="50"
/>

        {/* Current Location */}
        <button type="button" onClick={getCurrentLocation}>
         
          Use Current Location 📍
          className="bg-purple-600 text-white px-4 py-2 rounded-xl"
        </button>

        <br /><br />

        {/* Image Upload */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />

        <br /><br />

        {/* Image Preview */}
        {formData.image && (
          <>
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Preview"
              width="200"
              style={{
                borderRadius: "10px",
                marginTop: "10px",
              }}
            />

            <br /><br />
          </>
        )}

        {/* Location */}
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <br /><br />

        {/* Submit */}
        <button type="submit">
          Submit Issue
          className="bg-red-600 text-white px-4 py-2 rounded-xl"
        </button>
      </form>
    </div>
  );
}

export default ReportIssue;