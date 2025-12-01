"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

const inputClass = "bg-dark-200 rounded-[6px] px-5 py-2.5";
const textareaClass = "bg-dark-200 rounded-[6px] px-5 py-2.5";
const selectClass = "bg-dark-200 rounded-[6px] px-5 py-2.5";

const formatTime = (time: string) => {
  const [h, m] = time.split(":");
  const hour = parseInt(h ?? "", 10);
  if (isNaN(hour) || !m) return time;
  const suffix = hour >= 12 ? "PM" : "AM";
  const hour12 = ((hour + 11) % 12) + 1;
  return `${String(hour12).padStart(2, "0")}:${m} ${suffix}`;
};

const CreateEventForm: React.FC = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [overview, setOverview] = useState("");
  const [venue, setVenue] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [mode, setMode] = useState("online");
  const [audience, setAudience] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [agendaItems, setAgendaItems] = useState<string[]>([]);
  const [agendaStartInput, setAgendaStartInput] = useState("");
  const [agendaEndInput, setAgendaEndInput] = useState("");
  const [agendaTitleInput, setAgendaTitleInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
  };

  const addTag = () => {
    const value = tagInput.trim();
    if (!value || tags.includes(value)) return;
    setTags((prev) => [...prev, value]);
    setTagInput("");
  };

  const removeTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const addAgendaItem = () => {
    if (!agendaStartInput || !agendaEndInput || !agendaTitleInput.trim()) return;
    const item = `${formatTime(agendaStartInput)} - ${formatTime(
      agendaEndInput
    )} | ${agendaTitleInput.trim()}`;
    setAgendaItems((prev) => [...prev, item]);
    setAgendaTitleInput("");
    setAgendaStartInput("");
    setAgendaEndInput("");
  };

  const removeAgendaItem = (index: number) => {
    setAgendaItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAgendaKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addAgendaItem();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      setError("Image is required");
      return;
    }

    if (!tags.length) {
      setError("Please add at least one tag");
      return;
    }

    if (!agendaItems.length) {
      setError("Please add at least one agenda item");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("overview", overview);
      formData.append("venue", venue);
      formData.append("location", location);
      formData.append("date", date);
      formData.append("time", time);
      formData.append("mode", mode);
      formData.append("audience", audience);
      formData.append("organizer", organizer);
      formData.append("image", imageFile);
      formData.append("tags", JSON.stringify(tags));
      formData.append("agenda", JSON.stringify(agendaItems));

      const res = await fetch("/api/events", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data?.message || "Failed to create event");
        setIsSubmitting(false);
        return;
      }

      const slug: string | undefined = data?.event?.slug;
      if (slug) {
        router.push(`/events/${slug}`);
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("Create event failed", err);
      setError("Something went wrong while creating the event");
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto mt-10">
      <h1 className="text-center mb-8">Create Event</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        encType="multipart/form-data"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="venue">Venue</label>
          <input
            id="venue"
            type="text"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="audience">Audience</label>
          <input
            id="audience"
            type="text"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="time">Event Time (reference)</label>
          <input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="mode">Mode</label>
          <select
            id="mode"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            required
            className={selectClass}
          >
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="organizer">Organizer</label>
          <input
            id="organizer"
            type="text"
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
            required
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-2">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            className={textareaClass}
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-2">
          <label htmlFor="overview">Overview</label>
          <textarea
            id="overview"
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            required
            rows={2}
            className={textareaClass}
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-2">
          <label>Tags</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <span key={tag + index} className="pill flex items-center gap-2">
                {tag}
                <button
                  type="button"
                  className="text-light-200 text-xs hover:text-red-400"
                  onClick={() => removeTag(index)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="Add a tag and press Enter"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-2">
          <label>Agenda</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="time"
              value={agendaStartInput}
              onChange={(e) => setAgendaStartInput(e.target.value)}
              className={inputClass}
              placeholder="Start"
            />
            <input
              type="time"
              value={agendaEndInput}
              onChange={(e) => setAgendaEndInput(e.target.value)}
              className={inputClass}
              placeholder="End"
            />
            <input
              type="text"
              value={agendaTitleInput}
              onChange={(e) => setAgendaTitleInput(e.target.value)}
              onKeyDown={handleAgendaKeyDown}
              className={inputClass}
              placeholder="Keynote: AI-Driven Cloud Infrastructure"
            />
          </div>
          <p className="text-xs text-light-200 mt-1">
            Press Enter in the title field to add an agenda item.
          </p>
          <div className="flex flex-wrap gap-2 mt-2 max-h-32 overflow-y-auto">
            {agendaItems.map((item, index) => (
              <span key={item + index} className="pill flex items-center gap-2">
                {item}
                <button
                  type="button"
                  className="text-light-200 text-xs hover:text-red-400"
                  onClick={() => removeAgendaItem(index)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col gap-2">
          <label htmlFor="image">Image</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className={inputClass}
          />
        </div>

        {error && (
          <div className="md:col-span-2">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        <div className="md:col-span-2">
          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 w-full cursor-pointer items-center justify-center rounded-[6px] px-4 py-2.5 text-lg font-semibold text-black"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Event"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateEventForm;
