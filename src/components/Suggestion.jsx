import { GoogleGenerativeAI } from "@google/generative-ai";
import { geminiAiKey } from "../utils/constant";
import { useContext, useState } from "react";
import WeatherContext from "../utils/WeatherContext";

const Suggestion = () => {
  const [suggestionText, setSuggestionText] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const { currentWeather } = useContext(WeatherContext);

  const options = [
    { value: "Farmer", label: "Farmer" },
    { value: "Pilot", label: "Pilot" },
    { value: "Event Planner", label: "Event Planner" },
    { value: "Construction Workers", label: "Construction Workers" },
    { value: "Outdoor Event Organizers", label: "Outdoor Event Organizers" },
    { value: "Tour Guide", label: "Tour Guides" },
    { value: "Outdoor Sports", label: "Outdoor Sports" },
    { value: "Logistics Professionals", label: "Logistics Professionals" },
  ];

  // Access your API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(geminiAiKey);

  async function getSuggestion(profession) {
    const message = `Write a weather awarness suggestion in exact 4 bullet points ${profession}. The weather data is given as ${JSON.stringify(
      currentWeather
    )}`;
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });
    const prompt = message;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    text.split
    setSuggestionText(text);
    console.log(text);
  }

  function handleSelect(e) {
    const value = e.target.value
    if (value) {
      setSelectedValue(value)
      getSuggestion(value);
    }
  }

  return (
    <div className="p-2 mt-10 w-96 min-h-80 rounded-lg overflow-hidden shadow-lg bg-slate-200">
      <div className="text-center">
        <select
          className="p-2 bg-slate-200 border rounded-lg border-slate-800"
          value={selectedValue}
          onChange={(e) => handleSelect(e)}
        >
          <option value="">Select an Option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        {!suggestionText ? (
          <h1>Please select the type of individual</h1>
        ) : (
          <p>{suggestionText}</p>
        )}
      </div>
    </div>
  );
};

export default Suggestion;
