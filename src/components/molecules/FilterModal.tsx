import React, { useState, useEffect } from 'react';
import { RiCloseLine, RiRefreshLine } from '@remixicon/react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setSearchKeywords, setExcludeKeywords, setActiveTab } from '@/store/filterSlice';

interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose }) => {
    const dispatch = useAppDispatch();
    const { searchKeywords, excludeKeywords, activeTab: storedActiveTab } = useAppSelector((state) => state.filter);

    // Local state for inputs to allow "Apply" behavior
    const [localSearch, setLocalSearch] = useState(searchKeywords);
    const [localExclude, setLocalExclude] = useState(excludeKeywords);
    const [activeTab, setActiveTabState] = useState(storedActiveTab);

    // Sync local state when modal opens or store changes
    useEffect(() => {
        if (isOpen) {
            setLocalSearch(searchKeywords);
            setLocalExclude(excludeKeywords);
            setActiveTabState(storedActiveTab);
        }
    }, [isOpen, searchKeywords, excludeKeywords, storedActiveTab]);

    const handleApply = () => {
        dispatch(setSearchKeywords(localSearch));
        dispatch(setExcludeKeywords(localExclude));
        dispatch(setActiveTab(activeTab));
        onClose();
    };

    if (!isOpen) return null;

    const tabs = [
        { name: 'New Pairs', count: null },
        { name: 'Final Stretch', count: 4 },
        { name: 'Migrated', count: 3 },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div
                className="w-[340px] bg-[#18181a] border border-[#2a2a35] rounded-xl shadow-2xl overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#2a2a35]">
                    <h2 className="text-white text-[14px] font-medium">Filters</h2>
                    <button onClick={onClose} className="text-[#64748b] hover:text-white transition-colors">
                        <RiCloseLine size={18} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex items-center justify-between px-4 border-b border-[#2a2a35]">
                    <div className="flex gap-3">
                        {tabs.map((tab) => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTabState(tab.name)}
                                className={`relative py-3 text-[12px] font-medium transition-colors flex items-center gap-1.5 ${activeTab === tab.name ? 'text-white' : 'text-[#64748b] hover:text-[#94a3b8]'
                                    }`}
                            >
                                {tab.name}
                                {tab.count !== null && (
                                    <span className={`px-1.5 py-[1px] text-[9px] rounded-full ${activeTab === tab.name ? 'bg-[#526fff] text-white' : 'bg-[#2a2a35] text-[#64748b]'
                                        }`}>
                                        {tab.count}
                                    </span>
                                )}
                                {activeTab === tab.name && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#526fff] rounded-t-full" />
                                )}
                            </button>
                        ))}
                    </div>
                    <button className="text-[#64748b] hover:text-white transition-colors p-1.5">
                        <RiRefreshLine size={14} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 space-y-4 flex-1 min-h-[350px]">
                    <div className="space-y-3">
                        <div className="space-y-1.5">
                            <label className="text-[10px] text-[#94a3b8] font-medium uppercase tracking-wide">Search Keywords</label>
                            <input
                                type="text"
                                value={localSearch}
                                onChange={(e) => setLocalSearch(e.target.value)}
                                placeholder="keyword1, keyword2..."
                                className="w-full bg-[#0a0a0c] border border-[#2a2a35] rounded-lg px-3 py-2 text-[12px] text-white placeholder-[#475569] focus:outline-none focus:border-[#526fff] transition-colors"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] text-[#94a3b8] font-medium uppercase tracking-wide">Exclude Keywords</label>
                            <input
                                type="text"
                                value={localExclude}
                                onChange={(e) => setLocalExclude(e.target.value)}
                                placeholder="keyword1, keyword2..."
                                className="w-full bg-[#0a0a0c] border border-[#2a2a35] rounded-lg px-3 py-2 text-[12px] text-white placeholder-[#475569] focus:outline-none focus:border-[#526fff] transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-[#2a2a35] flex items-center justify-between bg-[#18181a]">
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 bg-[#323542] hover:bg-[#434654] text-white text-[10px] font-bold rounded-md transition-colors">
                            Import
                        </button>
                        <button className="px-3 py-1.5 bg-[#323542] hover:bg-[#434654] text-white text-[10px] font-bold rounded-md transition-colors">
                            Export
                        </button>
                        <button className="px-3 py-1.5 bg-[#323542] hover:bg-[#434654] text-white text-[10px] font-bold rounded-md transition-colors">
                            Share
                        </button>
                    </div>
                    <button
                        onClick={handleApply}
                        className="px-4 py-1.5 bg-[#526fff] hover:bg-[#465ecc] text-white text-[11px] font-bold rounded-md transition-colors flex items-center gap-2 shadow-lg shadow-[#526fff]/20"
                    >
                        Apply All
                    </button>
                </div>
            </div>
        </div>
    );
};
