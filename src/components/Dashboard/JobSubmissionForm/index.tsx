"use client";

import { useState, useCallback, useMemo } from "react";
import Loader from "@/components/Common/Loader";
import SelectionSection from "./SelectionSection";
import { DMAS, STATES } from "./locationsData";
import toast from "react-hot-toast";

export default function JobSubmissionForm() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedStates, setSelectedStates] = useState<{ value: string; label: string }[]>([]);
  const [selectedDmas, setSelectedDmas] = useState<{ value: string; label: string }[]>([]);
  const [selectAllStates, setSelectAllStates] = useState(false);
  const [selectAllDmas, setSelectAllDmas] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Memoized state & DMA options
  const stateOptions = useMemo(() => STATES.map(state => ({ value: state, label: state })), []);
  const dmaOptions = useMemo(() => DMAS.map(dma => ({ value: dma, label: dma })), []);

  // Handlers with useCallback
  const handleSelectAllStates = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectAllStates(e.target.checked);
    setSelectedStates(e.target.checked ? stateOptions : []);
  }, [stateOptions]);

  const handleSelectAllDmas = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectAllDmas(e.target.checked);
    setSelectedDmas(e.target.checked ? dmaOptions : []);
  }, [dmaOptions]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSubmitting(true);

    // Get auth token from localStorage
    const token = localStorage.getItem("geomap_auth");
    if (!token) {
      toast.error("Authorization token not found. Please log in again.");
      setIsSubmitting(false);
      return;
    }

    // Generate formatted search queries
    const searchQueriesArray = [
      ...selectedStates.map(state => `${searchQuery} in ${state.value}`),
      ...selectedDmas.map(dma => `${searchQuery} in ${dma.value}`)
    ];

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/jobs/submit-job`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ queries: searchQueriesArray }),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit job: ${response.statusText}`);
      }

      const data = await response.json();

      toast.success(data.detail);

      // Reset form after successful submission
      setSearchQuery("");
      setSelectedStates([]);
      setSelectedDmas([]);
      setSelectAllStates(false);
      setSelectAllDmas(false);
    } catch (error) {
      console.error("🚨 Error submitting job:", error);
      toast.error("Something went wrong while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border">
      {/* 📌 Text Input */}
      <div className="mb-4">
        <label htmlFor="scrapeQuery" className="text-sm text-gray-500 block mb-1">
          Enter Search Query <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 text-sm border rounded-lg focus:border-primary outline-none"
          id="scrapeQuery"
          placeholder="Enter keywords or business names to scrape"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          required
        />
      </div>

      {/* 📌 State & DMA Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <SelectionSection
          title="States"
          options={stateOptions}
          selectedOptions={selectedStates}
          setSelectedOptions={setSelectedStates}
          selectAll={selectAllStates}
          handleSelectAll={handleSelectAllStates}
        />

        <SelectionSection
          title="DMAs"
          options={dmaOptions}
          selectedOptions={selectedDmas}
          setSelectedOptions={setSelectedDmas}
          selectAll={selectAllDmas}
          handleSelectAll={handleSelectAllDmas}
        />
      </div>

      {/* 📌 Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"} w-full flex justify-center items-center h-10 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition`}
      >
        {isSubmitting ? <Loader /> : "Submit Job"}
      </button>
    </form>
  );
}
