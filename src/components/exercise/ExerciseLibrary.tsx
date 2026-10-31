import React, { useState } from 'react';
import { EXERCISES } from '../../data/exercises';
import { ExerciseCard } from './ExerciseCard';
import { Exercise } from '../../types';
import { useApp } from '../../context/AppContext';
import { Search, Filter, ShieldCheck, Dumbbell, Sparkles } from 'lucide-react';

export const ExerciseLibrary: React.FC = () => {
  const { setSelectedExercise, activeProfile } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('all');
  const [selectedSafetyStatus, setSelectedSafetyStatus] = useState<number | 'all'>('all');

  const allExercises = Object.values(EXERCISES);

  const filteredExercises = allExercises.filter((ex) => {
    // Search
    const matchesSearch = 
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.targetMuscles.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));

    // Category
    const matchesCategory = selectedCategory === 'all' || ex.category === selectedCategory;

    // Equipment
    const matchesEquipment = 
      selectedEquipment === 'all' || ex.equipment.includes(selectedEquipment as any);

    // Safety status
    const matchesSafety = 
      selectedSafetyStatus === 'all' || ex.safetyStatus === selectedSafetyStatus;

    return matchesSearch && matchesCategory && matchesEquipment && matchesSafety;
  });

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'legs', label: 'Lower Body & Hips' },
    { id: 'upper', label: 'Upper Body & Arms' },
    { id: 'core', label: 'Core Stability' },
    { id: 'mobility', label: 'Mobility & Recovery' }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 dark:bg-teal-950/60 px-2.5 py-0.5 rounded-full border border-teal-200/50">
              Interactive Movement Library
            </span>
            <span className="text-xs text-slate-400 font-semibold">• Profile: {activeProfile.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mt-1">
            Animated Exercise Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Every exercise features joint-kinematic animation, step-by-step cueing, breathing patterns, and clinical notes.
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 self-start sm:self-center">
          {filteredExercises.length} Exercises Available
        </span>
      </div>

      {/* Search & Filters */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search exercises by name, muscles (e.g. 'calves', 'biceps', 'glutes')..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-2 pt-1">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedCategory === c.id
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Equipment & Safety Status Quick Selectors */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <select
            value={selectedEquipment}
            onChange={(e) => setSelectedEquipment(e.target.value)}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none"
          >
            <option value="all">Equipment: Any</option>
            <option value="chair">Sturdy Chair Only</option>
            <option value="wall">Wall Supported</option>
            <option value="resistance_bands">Resistance Bands</option>
            <option value="convertible_dumbbells">Symactive Dumbbells</option>
            <option value="mat">Exercise Mat</option>
          </select>

          <select
            value={selectedSafetyStatus}
            onChange={(e) => setSelectedSafetyStatus(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none"
          >
            <option value="all">Safety Tier: Any</option>
            <option value={1}>Tier 1: General Safe</option>
            <option value={2}>Tier 2: Verify Back Fit</option>
            <option value={3}>Tier 3: Clinician Prescribed</option>
          </select>
        </div>
      </div>

      {/* Grid of Exercise Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredExercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onSelect={() => setSelectedExercise(exercise)}
          />
        ))}
      </div>
    </div>
  );
};

