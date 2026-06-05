/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Mic, 
  History, 
  Settings, 
  Plus, 
  X, 
  Send, 
  Image as ImageIcon, 
  Activity, 
  Users, 
  Footprints, 
  Utensils, 
  Dumbbell, 
  MapPin, 
  Briefcase,
  Filter,
  LayoutGrid,
  List as ListIcon,
  MessageSquare,
  User,
  DollarSign,
  Moon,
  Smile,
  Coffee,
  BookOpen,
  Search,
  ListFilter
} from "lucide-react";

const ACTIVITIES = [
  { id: 'people', label: 'People', color: 'text-blue-500', icon: Users },
  { id: 'walk', label: 'Walk', color: 'text-green-500', icon: Footprints },
  { id: 'food', label: 'Food', color: 'text-orange-500', icon: Utensils },
  { id: 'gym', label: 'Gym', color: 'text-red-500', icon: Dumbbell },
  { id: 'travel', label: 'Travel', color: 'text-purple-500', icon: MapPin },
  { id: 'work', label: 'Work', color: 'text-indigo-500', icon: Briefcase },
  { id: 'spending', label: 'Spending', color: 'text-emerald-500', icon: DollarSign },
  { id: 'sleep', label: 'Sleep', color: 'text-indigo-400', icon: Moon },
  { id: 'mood', label: 'Mood', color: 'text-yellow-500', icon: Smile },
  { id: 'fuel', label: 'Fuel', color: 'text-amber-600', icon: Coffee },
  { id: 'read', label: 'Read', color: 'text-cyan-500', icon: BookOpen },
];

interface LogEntry {
  id: string;
  date: string;
  time: string;
  title: string;
  summary: string;
  images: string[];
  activities: (typeof ACTIVITIES[0])[];
}

const MOCK_LOGS: LogEntry[] = [
  {
    id: '1',
    date: 'Feb 10, 2024',
    time: '04:45 PM',
    title: 'Weekend Hike',
    summary: 'The trail was steep but the view at the summit was absolutely breathtaking.',
    images: ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800'],
    activities: [ACTIVITIES[1], ACTIVITIES[4]]
  },
  {
    id: '2',
    date: 'Feb 07, 2024',
    time: '12:30 PM',
    title: 'Deep Gratitude',
    summary: 'Grateful for the small things today: the perfect cup of coffee.',
    images: [],
    activities: [ACTIVITIES[5]]
  },
  {
    id: '3',
    date: 'Feb 05, 2024',
    time: '09:15 AM',
    title: 'Project Idea',
    summary: 'Had a breakthrough while walking. The architecture should be simpler.',
    images: [],
    activities: [ACTIVITIES[0], ACTIVITIES[5]]
  },
  {
    id: '4',
    date: 'Feb 01, 2024',
    time: '08:00 AM',
    title: 'Coffee & Flow',
    summary: 'Morning routine is finally clicking. 2 hours of deep work.',
    images: ['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800'],
    activities: [ACTIVITIES[2]]
  },
  {
    id: '5',
    date: 'Jan 28, 2024',
    time: '10:00 PM',
    title: 'Late Night Gym',
    summary: 'Actually felt energized. New PR on bench press!',
    images: ['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800'],
    activities: [ACTIVITIES[3]]
  },
  {
    id: '6',
    date: 'Jan 25, 2024',
    time: '02:00 PM',
    title: 'Museum Visit',
    summary: 'Spent hours in the modern art section. Feeling inspired.',
    images: ['https://images.unsplash.com/photo-1518998053502-51dd0c61ee07?auto=format&fit=crop&q=80&w=800'],
    activities: [ACTIVITIES[4], ACTIVITIES[1]]
  },
  {
    id: '7',
    date: 'Jan 22, 2024',
    time: '01:15 PM',
    title: 'Lunch with Mom',
    summary: 'Good to catch up. We tried that new Italian place.',
    images: ['https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800'],
    activities: [ACTIVITIES[2], ACTIVITIES[0]]
  },
  {
    id: '8',
    date: 'Jan 18, 2024',
    time: '11:45 PM',
    title: 'Quick Thoughts',
    summary: 'Recording some ideas before I forget them tomorrow.',
    images: [],
    activities: [ACTIVITIES[5]]
  },
  {
    id: '9',
    date: 'Jan 15, 2024',
    time: '05:30 PM',
    title: 'Sunset Walk',
    summary: 'The sky was purple and orange. Nature is amazing.',
    images: ['https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&q=80&w=800'],
    activities: [ACTIVITIES[1]]
  },
  {
    id: '10',
    date: 'Jan 12, 2024',
    time: '09:00 AM',
    title: 'Reading Morning',
    summary: 'Finished three chapters of that new sci-fi book.',
    images: [],
    activities: [ACTIVITIES[0]]
  },
  {
    id: '11',
    date: 'Jan 08, 2024',
    time: '07:30 PM',
    title: 'Cooking Session',
    summary: 'Made lasagna for the first time. It was messy but delicious.',
    images: ['https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800'],
    activities: [ACTIVITIES[2]]
  },
  {
    id: '12',
    date: 'Jan 05, 2024',
    time: '10:15 AM',
    title: 'Team Meetup',
    summary: 'Strategy session went well. Everyone is aligned.',
    images: [],
    activities: [ACTIVITIES[5], ACTIVITIES[0]]
  },
  {
    id: '13',
    date: 'Jan 02, 2024',
    time: '08:00 PM',
    title: 'New Year Reflection',
    summary: 'Setting goals for 2024. Health and creativity are priorities.',
    images: ['https://images.unsplash.com/photo-1467803738586-46b7eb7b16a1?auto=format&fit=crop&q=80&w=800'],
    activities: [ACTIVITIES[5]]
  },
  {
    id: '14',
    date: 'Dec 28, 2023',
    time: '03:45 PM',
    title: 'Winter Cabin',
    summary: 'The wood stove is making the whole place smells like cedar.',
    images: ['https://images.unsplash.com/photo-1445510861639-5651173bc5d5?auto=format&fit=crop&q=80&w=800'],
    activities: [ACTIVITIES[4]]
  },
  {
    id: '15',
    date: 'Dec 24, 2023',
    time: '06:00 PM',
    title: 'Christmas Eve',
    summary: 'Dinner with the whole family. Too much food but so much fun.',
    images: [],
    activities: [ACTIVITIES[0], ACTIVITIES[2]]
  },
  {
    id: '16',
    date: 'Dec 20, 2023',
    time: '11:00 AM',
    title: 'Final Work Sprint',
    summary: 'Wrapping up all projects before the holidays.',
    images: [],
    activities: [ACTIVITIES[5]]
  },
  {
    id: '17',
    date: 'Dec 15, 2023',
    time: '04:20 PM',
    title: 'Icy Walk',
    summary: 'Everything is covered in a thin layer of crystal ice.',
    images: ['https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&q=80&w=800'],
    activities: [ACTIVITIES[1]]
  },
  {
    id: '18',
    date: 'Dec 10, 2023',
    time: '01:00 PM',
    title: 'Library Session',
    summary: 'Deep research afternoon. Found some great references.',
    images: [],
    activities: [ACTIVITIES[5]]
  },
  {
    id: '19',
    date: 'Dec 05, 2023',
    time: '08:30 AM',
    title: 'Early Commute',
    summary: 'The city looks peaceful before the rush hour starts.',
    images: ['https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=800'],
    activities: [ACTIVITIES[4]]
  },
  {
    id: '20',
    date: 'Dec 01, 2023',
    time: '07:00 PM',
    title: 'Sushi Night',
    summary: 'Best uni I have ever had. Celebration for a good month.',
    images: ['https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&q=80&w=800'],
    activities: [ACTIVITIES[2], ACTIVITIES[0]]
  },
  {
    id: '21',
    date: 'Nov 28, 2023',
    time: '11:50 PM',
    title: 'Late Inspiration',
    summary: 'Woke up with an idea for the menu design.',
    images: [],
    activities: [ACTIVITIES[5]]
  },
  {
    id: '22',
    date: 'Nov 24, 2023',
    time: '02:00 PM',
    title: 'Cold Park Run',
    summary: 'Running in the cold is hard but addictive once you start.',
    images: ['https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=800'],
    activities: [ACTIVITIES[3]]
  },
  {
    id: '23',
    date: 'Nov 20, 2023',
    time: '12:00 PM',
    title: 'Lunch Break',
    summary: 'Quick salad while answering emails.',
    images: [],
    activities: [ACTIVITIES[2], ACTIVITIES[5]]
  },
  {
    id: '24',
    date: 'Nov 15, 2023',
    time: '08:45 PM',
    title: 'Movie Night',
    summary: 'Rewatched Inception. Still as confusing as ever.',
    images: ['https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800'],
    activities: [ACTIVITIES[0]]
  },
  {
    id: '25',
    date: 'Nov 10, 2023',
    time: '09:00 AM',
    title: 'Sunrise Yoga',
    summary: 'Perfect way to start the morning.',
    images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'],
    activities: [ACTIVITIES[3]]
  },
  {
    id: '26',
    date: 'Nov 05, 2023',
    time: '03:15 PM',
    title: 'Bookstore Hunt',
    summary: 'Found a rare first edition of Kafka.',
    images: [],
    activities: [ACTIVITIES[4]]
  },
  {
    id: '27',
    date: 'Nov 01, 2023',
    time: '11:11 PM',
    title: 'Make a Wish',
    summary: 'Just a thought for the future.',
    images: [],
    activities: [ACTIVITIES[5]]
  },
  {
    id: '28',
    date: 'Oct 28, 2023',
    time: '04:30 PM',
    title: 'Autumn Leaves',
    summary: 'The colors in the park are incredible right now.',
    images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800'],
    activities: [ACTIVITIES[1]]
  },
  {
    id: '29',
    date: 'Oct 25, 2023',
    time: '07:30 PM',
    title: 'Dinner Party',
    summary: 'Hosted friends for a taco night.',
    images: ['https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800'],
    activities: [ACTIVITIES[0], ACTIVITIES[2]]
  },
  {
    id: '30',
    date: 'Oct 20, 2023',
    time: '10:00 AM',
    title: 'Market Visit',
    summary: 'Fresh flowers and local honey.',
    images: ['https://images.unsplash.com/photo-1488459711651-2a301e242251?auto=format&fit=crop&q=80&w=800'],
    activities: [ACTIVITIES[4]]
  },
  {
    id: '31',
    date: 'Oct 15, 2023',
    time: '01:00 PM',
    title: 'Coding Sprints',
    summary: 'Productive afternoon building recursive components.',
    images: [],
    activities: [ACTIVITIES[5]]
  },
  {
    id: '32',
    date: 'Oct 10, 2023',
    time: '08:00 AM',
    title: 'Misty Walk',
    summary: 'The fog was so thick I could barely see the trail.',
    images: ['https://images.unsplash.com/photo-1444384851176-6e23071c6127?auto=format&fit=crop&q=80&w=800'],
    activities: [ACTIVITIES[1]]
  }
];

export default function App() {
  const [currentView, setCurrentView] = useState<'voice' | 'text' | 'logs'>('voice');
  const [logsViewMode, setLogsViewMode] = useState<'grid' | 'list'>('list');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState<typeof ACTIVITIES>([]);
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [filterActivityId, setFilterActivityId] = useState<string | null>(null);
  const [isFilterMode, setIsFilterMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputText, setInputText] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const logsScrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const wasLongPress = useRef(false);

  // Handle scroll in logs view
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    if (scrollTop > 20 && !isScrolled) {
      setIsScrolled(true);
    } else if (scrollTop <= 20 && isScrolled) {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    if (currentView !== 'logs') {
      setIsScrolled(false);
    }
  }, [currentView]);

  const finalizeLog = () => {
    if (inputText || selectedActivities.length > 0 || isRecording) {
      console.log("Finalizing log:", { text: inputText, activities: selectedActivities, voice: isRecording });
      setInputText("");
      setSelectedActivities([]);
      setIsRecording(false);
      setCurrentView('voice');
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      finalizeLog();
    } else {
      setIsRecording(true);
    }
  };

  const handleActivityClick = (activity: typeof ACTIVITIES[0]) => {
    if (wasLongPress.current) {
      wasLongPress.current = false;
      return;
    }
    
    if (isFilterMode) {
      setFilterActivityId(prev => prev === activity.id ? null : activity.id);
      setShowActivities(false);
      setIsFilterMode(false);
      return;
    }

    if (isMultiSelect) {
      setSelectedActivities(prev => 
        prev.find(a => a.id === activity.id) 
          ? prev.filter(a => a.id !== activity.id)
          : [...prev, activity]
      );
    } else {
      setSelectedActivities(prev => 
        prev.find(a => a.id === activity.id) ? prev : [...prev, activity]
      );
      setShowActivities(false);
      setShowAddMenu(false);
    }
  };

  const handleActivityLongPressStart = (activity: typeof ACTIVITIES[0]) => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
    wasLongPress.current = false;
    
    longPressTimer.current = setTimeout(() => {
      wasLongPress.current = true;
      setIsMultiSelect(true);
      setSelectedActivities(prev => {
        if (prev.find(a => a.id === activity.id)) return prev;
        return [...prev, activity];
      });
    }, 500);
  };

  const handleActivityLongPressEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  return (
    <div className="flex h-screen w-full font-sans text-[#1A1A1A] overflow-hidden bg-white">
      {/* Background Animated Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            x: [-100, 100, -100],
            y: [-60, 60, -60],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[15%] left-[10%] w-[130px] h-[130px] rounded-full bg-indigo-500/60 blur-[35px]"
        />
        <motion.div
          animate={{
            x: [80, -120, 80],
            y: [-50, 70, -50],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[35%] right-[15%] w-[110px] h-[110px] rounded-full bg-rose-500/50 blur-[45px]"
        />
        <motion.div
          animate={{
            x: [-90, 110, -90],
            y: [70, -50, 70],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[35%] left-[18%] w-[100px] h-[100px] rounded-full bg-violet-500/50 blur-[35px]"
        />
        <motion.div
          animate={{
            x: [110, -90, 110],
            y: [-70, 90, -70],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[10%] right-[22%] w-[120px] h-[120px] rounded-full bg-amber-400/60 blur-[55px]"
        />
        {/* Soft Frosting layer on top of circles */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[60px] z-[1]" />
      </div>

      {/* Container for content */}
      <div className="relative flex h-full w-full flex-col overflow-hidden">
        
        {/* Background Blur Overlay */}
        <AnimatePresence>
          {(showAddMenu || showActivities) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowAddMenu(false);
                setShowActivities(false);
              }}
              className="absolute inset-0 z-30 bg-white/5 backdrop-blur-2xl cursor-pointer"
            />
          )}
        </AnimatePresence>

        {/* Activity Selection Full Screen View */}
        <AnimatePresence mode="popLayout">
          {showActivities && (
            <motion.div
              key="activities-overlay"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="absolute inset-0 z-[60] flex flex-col items-center justify-center p-8 bg-white/5 backdrop-blur-3xl"
            >
              {/* Activity Selection Overlay (Scrollable Grid) */}
              <div className="w-full max-w-[340px] max-h-[60vh] overflow-y-auto no-scrollbar pointer-events-auto px-4 py-8">
                <div className="grid grid-cols-2 gap-x-8 gap-y-12 w-full pb-10">
                {ACTIVITIES.map((activity, idx) => {
                  const isSelected = isFilterMode 
                    ? filterActivityId === activity.id
                    : selectedActivities.find(a => a.id === activity.id);

                  return (
                    <motion.button
                      key={activity.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onMouseDown={() => !isFilterMode && handleActivityLongPressStart(activity)}
                      onMouseUp={handleActivityLongPressEnd}
                      onMouseLeave={handleActivityLongPressEnd}
                      onTouchStart={() => !isFilterMode && handleActivityLongPressStart(activity)}
                      onTouchEnd={handleActivityLongPressEnd}
                      onClick={() => handleActivityClick(activity)}
                      className="flex flex-col items-center gap-4 group relative"
                    >
                      <div className={`${activity.color} drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)] group-hover:scale-110 transition-transform ${
                        isSelected ? "scale-110" : "opacity-40"
                      }`}>
                        <activity.icon size={44} strokeWidth={1.2} />
                      </div>
                      <span className={`text-[10px] font-bold text-black uppercase tracking-[0.2em] transition-opacity ${
                        isSelected ? "opacity-100" : "opacity-40 group-hover:opacity-60"
                      }`}>
                        {activity.label}
                      </span>
                      
                      {!isFilterMode && isMultiSelect && isSelected && (
                        <div className="absolute -top-2 -right-2 bg-blue-500 text-white p-1 rounded-full shadow-lg">
                          <Plus size={12} strokeWidth={3} />
                        </div>
                      )}
                    </motion.button>
                  );
                })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

          {/* Logs Top Bar (Search ONLY) */}
        <AnimatePresence>
          {currentView === 'logs' && !showActivities && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-8 left-10 right-24 z-[60] flex flex-col gap-2"
            >
              {/* Search Bar */}
              <div className="relative group">
                <button 
                  className="absolute left-1.5 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full text-black/20 group-focus-within:text-black/40 hover:bg-black/5 hover:text-black transition-all cursor-pointer outline-none z-10"
                  onClick={() => console.log("Searching for:", searchQuery)}
                >
                  <Search size={14} strokeWidth={2.5} />
                </button>
                <input 
                  type="text"
                  placeholder="Search logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 bg-white/40 backdrop-blur-3xl border border-black/[0.12] rounded-full text-sm font-medium placeholder:text-black/20 outline-none focus:bg-white/60 transition-all shadow-sm"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dash Streak Pill - ONLY RECORD SCREEN */}
        <AnimatePresence mode="wait">
          {!showActivities && !isScrolled && currentView === 'voice' && (
            <motion.div
              key="streak"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-8 left-10 z-20 flex items-center h-10 gap-2 px-4 bg-white/60 backdrop-blur-md rounded-full shadow-sm border border-black/10"
            >
              <span className="text-[12px]">🔥</span>
              <span className="text-[11px] font-bold text-black/80">3 days streak</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Settings Button */}
        <div className="absolute top-8 right-10 z-[60]">
          <motion.button 
            id="settings-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/40 backdrop-blur-3xl border border-black/[0.12] text-black/40 hover:text-black hover:bg-white/60 transition-all shadow-sm"
          >
            <Settings size={20} strokeWidth={1.5} />
          </motion.button>
        </div>

        {/* Main Interaction Area */}
        <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden">
          
          <AnimatePresence mode="popLayout">
            {currentView === 'voice' ? (
              <motion.div
                key="voice-view"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-10 pb-36"
              >
                <motion.div
                  key="voice-container"
                  id="voice-container"
                  initial={false}
                  animate={{
                    y: isRecording ? -20 : 0,
                    scale: (showActivities || showAddMenu) ? 0.7 : 1,
                    opacity: (showActivities || showAddMenu) ? 0 : 1,
                    filter: (showActivities || showAddMenu) ? "blur(30px)" : "blur(0px)",
                  }}
                  className="flex flex-col items-center justify-center flex-1"
                >
                  <button
                    id="voice-btn-large"
                    onClick={toggleRecording}
                    className={`group relative flex items-center justify-center rounded-full border border-black/5 transition-all duration-500 ${
                      isRecording ? "w-40 h-40 bg-white shadow-xl" : "w-36 h-36 bg-[#FAFAFA] shadow-md"
                    }`}
                  >
                    {!isRecording && (
                      <>
                        <div className="absolute w-44 h-44 border border-black/[0.03] rounded-full scale-110 pointer-events-none" />
                        <div className="absolute w-52 h-52 border border-black/[0.01] rounded-full scale-125 pointer-events-none" />
                      </>
                    )}

                    {isRecording && (
                      <>
                        <motion.div
                          initial={{ scale: 1, opacity: 0.3 }}
                          animate={{ scale: 2, opacity: 0 }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="absolute inset-0 rounded-full bg-black/5"
                        />
                        <motion.div
                          initial={{ scale: 1, opacity: 0.3 }}
                          animate={{ scale: 1.6, opacity: 0 }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                          className="absolute inset-0 rounded-full bg-black/5"
                        />
                      </>
                    )}
                    <Mic 
                      size={40} 
                      strokeWidth={1}
                      className={isRecording ? "text-red-500" : "text-black"} 
                    />
                  </button>
                  <motion.span 
                    animate={{ opacity: isRecording ? 1 : 0 }}
                    className="mt-8 text-[14px] text-gray-500 italic font-medium"
                  >
                    {isRecording ? "listening..." : ""}
                  </motion.span>
                </motion.div>

                {/* Selected Activities at bottom of voice view */}
                <div className="mt-auto w-full flex flex-col items-center">
                  <AnimatePresence>
                    {selectedActivities.length > 0 && (
                      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                        {selectedActivities.map((activity) => (
                          <motion.div 
                            key={activity.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className={`${activity.color} flex items-center gap-1.5 px-3 py-2 rounded-full border border-black/10 bg-white/70 backdrop-blur-sm shadow-sm`}
                          >
                            <activity.icon size={14} strokeWidth={2} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">{activity.label}</span>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedActivities(prev => prev.filter(a => a.id !== activity.id));
                              }}
                              className="ml-1 text-black/40 hover:text-black/80 transition-colors"
                            >
                              <X size={12} strokeWidth={3} />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : currentView === 'text' ? (
              <motion.div
                key="text-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                exit={{ opacity: 0, y: -20 }}
                className={`absolute inset-0 flex flex-col items-center px-10 transition-all duration-500 ${isInputFocused ? 'pt-20 pb-20' : 'top-32 bottom-36'}`}
              >
                <textarea
                  autoFocus
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  placeholder="how was your day?"
                  className={`w-full flex-1 text-center font-light text-black placeholder:text-black/10 bg-transparent resize-none outline-none overflow-y-auto no-scrollbar transition-all duration-500 ${isInputFocused ? 'text-4xl' : 'text-2xl'}`}
                />
                
                <div className="w-full flex flex-col items-center mt-auto">
                  <AnimatePresence>
                    {selectedActivities.length > 0 && !isInputFocused && (
                      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                        {selectedActivities.map((activity) => (
                          <motion.div 
                            key={activity.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className={`${activity.color} flex items-center gap-1.5 px-3 py-2 rounded-full border border-black/10 bg-white/70 backdrop-blur-sm shadow-sm`}
                          >
                            <activity.icon size={14} strokeWidth={2} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">{activity.label}</span>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedActivities(prev => prev.filter(a => a.id !== activity.id));
                              }}
                              className="ml-1 text-black/40 hover:text-black/80 transition-colors"
                            >
                              <X size={12} strokeWidth={3} />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </AnimatePresence>

                  <div className="h-4" />
                </div>
              </motion.div>

            ) : (
              <motion.div
                key="logs-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onScroll={handleScroll}
                className="absolute inset-0 flex flex-col overflow-y-auto no-scrollbar"
              >
                {/* Spacer for top pill - removed "Logs" text as requested */}
                <div className="flex flex-col pt-40 px-8 mb-4">
                </div>

                <div className="grid grid-cols-2 gap-4 auto-rows-max px-8 pb-32">
                  {MOCK_LOGS
                    .filter(log => (!filterActivityId || log.activities.some(a => a.id === filterActivityId)) && 
                                   (log.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                    log.summary.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                    searchQuery === ""))
                    .map((log) => (
                    <motion.div
                      key={log.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative group rounded-[24px] overflow-hidden border border-black/5 shadow-sm bg-white/20 backdrop-blur-md p-3 flex flex-col h-fit"
                    >
                      {/* Thumbnail Container */}
                      <div className="relative w-full rounded-[18px] overflow-hidden bg-gray-100 aspect-square mb-3">
                        {/* Background blurred image for spread effect */}
                        {log.images.length > 0 ? (
                          <>
                            <img 
                              src={log.images[0]} 
                              alt="" 
                              className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30 scale-125"
                            />
                            <div className="absolute inset-0 bg-white/10 z-[1]" />
                            <img 
                              src={log.images[0]} 
                              alt={log.title}
                              className="relative z-[2] w-full h-full object-cover"
                            />
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-50 to-rose-50">
                            <div className="p-4 rounded-full bg-white/50 backdrop-blur-sm text-indigo-300">
                              <ImageIcon size={32} strokeWidth={1} />
                            </div>
                          </div>
                        )}

                        {/* Activity on Top Right (Grid View: 1) */}
                        <div className="absolute top-2.5 right-2.5 z-10 flex gap-1.5">
                          {log.activities.slice(0, 1).map(activity => (
                            <div key={activity.id} className="w-7 h-7 rounded-full bg-white/60 backdrop-blur-md flex items-center justify-center shadow-sm">
                              <activity.icon size={14} strokeWidth={2} className={activity.color} />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col">
                        <h3 className="font-bold text-black/90 tracking-tight text-[14px] leading-tight mb-0.5">
                          {log.title}
                        </h3>
                        <span className="text-[10px] text-black/30 font-medium uppercase tracking-wider">{log.date}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Bottom Navigation Overhaul */}
        <div className="fixed bottom-[10px] left-1/2 -translate-x-1/2 z-[100] w-[280px]">
          {/* SVG Border that follows the cutout curve */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 280 56">
            <path 
              d="M28,0.75 H102 A38,38 0 0 0 178,0.75 H252 A27.25,27.25 0 0 1 279.25,28 A27.25,27.25 0 0 1 252,55.25 H28 A27.25,27.25 0 0 1 0.75,28 A27.25,27.25 0 0 1 28,0.75 Z" 
              fill="none" 
              stroke="rgba(0,0,0,0.12)" 
              strokeWidth="1.5"
            />
          </svg>
          
          {/* Plus Menu - Moved OUTSIDE the masked container to avoid being cut off */}
          <div className="absolute bottom-20 right-2 z-[110]">
            <AnimatePresence>
              {showAddMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="flex flex-col gap-3 items-end min-w-[100px]"
                >
                  <button
                    onClick={() => {
                      setShowActivities(true);
                      setShowAddMenu(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-md rounded-2xl border border-black/5 shadow-sm text-[10px] font-bold uppercase tracking-widest text-black/80 hover:bg-white transition-colors"
                  >
                    Activity
                    <Activity size={16} className="text-blue-500" />
                  </button>
                  <button
                    onClick={() => {
                      fileInputRef.current?.click();
                      setShowAddMenu(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-md rounded-2xl border border-black/5 shadow-sm text-[10px] font-bold uppercase tracking-widest text-black/80 hover:bg-white transition-colors"
                  >
                    Media
                    <ImageIcon size={16} className="text-purple-500" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Floating Nav Container with Notch */}
          <div 
            className="relative flex items-center justify-between h-14 px-6 bg-white/40 backdrop-blur-3xl rounded-[28px] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)]"
            style={{
              maskImage: 'radial-gradient(circle at 50% 0, transparent 38px, black 39px)',
              WebkitMaskImage: 'radial-gradient(circle at 50% 0, transparent 38px, black 39px)',
            }}
          >
            
            {/* Left Action: Logs/Filter */}
            <div className="flex items-center justify-center w-10">
              <button 
                onClick={() => {
                  if (showActivities) {
                    setIsMultiSelect(false);
                    setShowActivities(false);
                    setShowAddMenu(false);
                    setIsFilterMode(false);
                  } else {
                    if (currentView === 'logs') {
                      setIsFilterMode(true);
                      setShowActivities(true);
                    } else {
                      setCurrentView('logs');
                    }
                  }
                }}
                className={`transition-colors duration-300 ${
                  ((currentView === 'logs' && !!filterActivityId) || (showActivities && !isFilterMode)) 
                    ? 'text-black' 
                    : 'text-black/40 hover:text-black'
                }`}
              >
                {showActivities 
                  ? (isMultiSelect ? <Plus size={20} strokeWidth={1.5} /> : (isFilterMode ? <X size={20} strokeWidth={1.5} /> : <ListIcon size={20} strokeWidth={1.5} />))
                  : (currentView === 'logs' ? <ListFilter size={20} strokeWidth={1.5} /> : <ListIcon size={20} strokeWidth={1.5} />)
                }
              </button>
            </div>
 
            <div className="w-16" /> {/* Spacer for centered button */}
 
            {/* Right Action: Profile / Plus / Clear Filter Menu Button */}
            <div className="flex items-center justify-center w-10 relative">
              <button 
                onMouseDown={(e) => {
                  if (currentView === 'text' && inputText && isInputFocused) {
                    e.preventDefault();
                    finalizeLog();
                  }
                }}
                onClick={() => {
                  if (currentView === 'text' && inputText && isInputFocused) return;

                  if (filterActivityId) {
                    setFilterActivityId(null);
                  } else if (showActivities && !isFilterMode) {
                    setShowActivities(false);
                    setIsMultiSelect(false);
                  } else if (showAddMenu) {
                    setShowAddMenu(false);
                  } else if (currentView !== 'logs') {
                    setShowAddMenu(!showAddMenu);
                  }
                }}
                className={`transition-all duration-300 ${(showAddMenu || (showActivities && !isFilterMode) || filterActivityId) ? 'text-black' : 'text-black/40 hover:text-black'} ${showAddMenu ? 'rotate-45' : ''}`}
              >
                {filterActivityId ? (
                  <X size={20} strokeWidth={1.5} />
                ) : (isFilterMode && showActivities) ? (
                  <User size={20} strokeWidth={1.5} />
                ) : currentView === 'logs' ? (
                  <User size={20} strokeWidth={1.5} />
                ) : (currentView === 'text' && inputText && isInputFocused) ? (
                  <Send size={20} strokeWidth={1.5} />
                ) : (showAddMenu || showActivities) ? (
                  <X size={20} strokeWidth={1.5} />
                ) : (
                  <Plus size={20} strokeWidth={1.5} />
                )}
              </button>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
              />
            </div>
          </div>
 
          {/* Middle Prioritized Button - outside the masked container but inside the fixed relative wrapper */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-8">
            <motion.button
              layoutId="mode-toggle"
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (showActivities) {
                  setShowActivities(false);
                  setIsMultiSelect(false);
                  setIsFilterMode(false);
                }

                if (currentView === 'logs') {
                  setCurrentView('voice');
                } else {
                  setCurrentView(currentView === 'voice' ? 'text' : 'voice');
                }
              }}
              className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-[2px] flex items-center justify-center shadow-[0_8px_20px_-5px_rgba(0,0,0,0.2)] border border-black/5 text-black"
            >
              {currentView === 'logs' ? (
                <Mic size={24} strokeWidth={1.5} className={isRecording ? "text-red-500" : ""} />
              ) : currentView === 'text' ? (
                <Mic size={24} strokeWidth={1.5} />
              ) : currentView === 'voice' ? (
                <MessageSquare size={24} strokeWidth={1.5} />
              ) : (
                <Mic size={24} strokeWidth={1.5} />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
