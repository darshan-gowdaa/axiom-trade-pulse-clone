import React, { useState, useEffect } from 'react';
import { RiCloseLine, RiResetLeftLine } from '@remixicon/react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setActiveModalTab, setFilterConfig, FilterConfig } from '@/store/filterSlice';

interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose }) => {
    const dispatch = useAppDispatch();
    const { activeModalTab, filters } = useAppSelector((state) => state.filter);

    const [localConfig, setLocalConfig] = useState<FilterConfig>({
        searchKeywords: '',
        excludeKeywords: '',
        sortBy: 'mC',
        sortOrder: 'desc',
        minMC: '',
        maxMC: '',
        minVol: '',
        maxVol: '',
        minTx: '',
        maxTx: '',
    });

    useEffect(() => {
        if (isOpen && filters[activeModalTab]) {
            setLocalConfig(filters[activeModalTab]);
        }
    }, [isOpen, activeModalTab, filters]);

    const handleApply = () => {
        dispatch(setFilterConfig({ tab: activeModalTab, config: localConfig }));
        onClose();
    };

    const handleTabChange = (tabName: string) => {
        dispatch(setFilterConfig({ tab: activeModalTab, config: localConfig }));
        dispatch(setActiveModalTab(tabName));
    };

    const handleReset = () => {
        setLocalConfig({
            searchKeywords: '',
            excludeKeywords: '',
            sortBy: 'mC',
            sortOrder: 'desc',
            minMC: '',
            maxMC: '',
            minVol: '',
            maxVol: '',
            minTx: '',
            maxTx: '',
        });
    };

    if (!isOpen) return null;

    const tabs = [
        { name: 'New Pairs', count: null },
        { name: 'Final Stretch', count: 4 },
        { name: 'Migrated', count: 3 },
    ];

    const updateConfig = (key: keyof FilterConfig, value: any) => {
        setLocalConfig(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div
                className="w-[340px] bg-[#18181a] border border-[#2a2a35] rounded-l shadow-2xl overflow-hidden flex flex-col max-h-[65vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-3 py-2 border-b border-[#2a2a35]  ">
                    <h2 className="text-white text-[12px] font-medium">Filters</h2>
                    <button onClick={onClose} className="text-[#64748b] hover:text-white transition-colors p-1">
                        <RiCloseLine size={14} />
                    </button>
                </div>


                <div className="px-3 -mb-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.name}
                                    onClick={() => handleTabChange(tab.name)}
                                    className={`relative py-2 text-[11px] font-medium transition-colors flex items-center gap-1 whitespace-nowrap pb-3 ${activeModalTab === tab.name ? 'text-white' : 'text-[#64748b] hover:text-[#94a3b8]'
                                        }`}
                                >
                                    {tab.name}
                                    {tab.count !== null && (
                                        <span className={`px-1 py-px text-[8px] rounded-full ${activeModalTab === tab.name ? 'bg-[#526fff] text-white' : 'bg-[#2a2a35] text-[#64748b]'
                                            }`}>
                                            {tab.count}
                                        </span>
                                    )}
                                    {activeModalTab === tab.name && (
                                        <div className="absolute bottom-2 left-0 right-0 h-[2px] bg-[#526fff]" />
                                    )}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={handleReset}
                            className="p-1 text-[#64748b] hover:text-white transition-colors"
                        >
                            <RiResetLeftLine size={14} />
                        </button>
                    </div>
                </div>

                <div className="p-3 space-y-3 flex-1 overflow-y-auto min-h-[350px]">
                    <div className="flex gap-2">
                        <div className="flex-1 space-y-1">
                            <label className="text-[9px] text-[#94a3b8] font-medium uppercase tracking-wide">Search</label>
                            <input
                                type="text"
                                value={localConfig.searchKeywords}
                                onChange={(e) => updateConfig('searchKeywords', e.target.value)}
                                placeholder="Name, Symbol, Address..."
                                className="w-full bg-[#0a0a0c] border border-[#2a2a35] rounded-md px-2 py-1 text-[11px] text-white placeholder-[#475569] focus:outline-none focus:border-[#526fff] transition-colors"
                            />
                        </div>
                        <div className="flex-1 space-y-1">
                            <label className="text-[9px] text-[#94a3b8] font-medium uppercase tracking-wide">Exclude</label>
                            <input
                                type="text"
                                value={localConfig.excludeKeywords}
                                onChange={(e) => updateConfig('excludeKeywords', e.target.value)}
                                placeholder="Keywords to exclude..."
                                className="w-full bg-[#0a0a0c] border border-[#2a2a35] rounded-md px-2 py-1 text-[11px] text-white placeholder-[#475569] focus:outline-none focus:border-[#526fff] transition-colors"
                            />
                        </div>
                    </div>

                    <div className="h-[1px] bg-[#2a2a35] w-full" />

                    <div className="space-y-1.5">
                        <label className="text-[9px] text-[#94a3b8] font-medium uppercase tracking-wide">Sort By</label>
                        <div className="grid grid-cols-2 gap-1.5">
                            <select
                                value={localConfig.sortOrder}
                                onChange={(e) => updateConfig('sortOrder', e.target.value)}
                                className="bg-[#0a0a0c] border border-[#2a2a35] rounded-md px-2 py-1 text-[11px] text-white focus:outline-none focus:border-[#526fff]"
                            >
                                <option value="desc">High to Low</option>
                                <option value="asc">Low to High</option>
                            </select>
                        </div>
                    </div>

                    <div className="h-[1px] bg-[#2a2a35] w-full" />

                    <div className="space-y-2">
                        <label className="text-[9px] text-[#94a3b8] font-medium uppercase tracking-wide">Filters</label>

                        <div className="grid grid-cols-3 gap-1.5 items-center">
                            <span className="text-[10px] text-[#64748b]">Market Cap</span>
                            <input
                                type="text"
                                value={localConfig.minMC}
                                onChange={(e) => updateConfig('minMC', e.target.value)}
                                placeholder="Min"
                                className="bg-[#0a0a0c] border border-[#2a2a35] rounded-md px-1.5 py-1 text-[10px] text-white focus:outline-none focus:border-[#526fff]"
                            />
                            <input
                                type="text"
                                value={localConfig.maxMC}
                                onChange={(e) => updateConfig('maxMC', e.target.value)}
                                placeholder="Max"
                                className="bg-[#0a0a0c] border border-[#2a2a35] rounded-md px-1.5 py-1 text-[10px] text-white focus:outline-none focus:border-[#526fff]"
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-1.5 items-center">
                            <span className="text-[10px] text-[#64748b]">Volume</span>
                            <input
                                type="text"
                                value={localConfig.minVol}
                                onChange={(e) => updateConfig('minVol', e.target.value)}
                                placeholder="Min"
                                className="bg-[#0a0a0c] border border-[#2a2a35] rounded-md px-1.5 py-1 text-[10px] text-white focus:outline-none focus:border-[#526fff]"
                            />
                            <input
                                type="text"
                                value={localConfig.maxVol}
                                onChange={(e) => updateConfig('maxVol', e.target.value)}
                                placeholder="Max"
                                className="bg-[#0a0a0c] border border-[#2a2a35] rounded-md px-1.5 py-1 text-[10px] text-white focus:outline-none focus:border-[#526fff]"
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-1.5 items-center">
                            <span className="text-[10px] text-[#64748b]">TXs</span>
                            <input
                                type="text"
                                value={localConfig.minTx}
                                onChange={(e) => updateConfig('minTx', e.target.value)}
                                placeholder="Min"
                                className="bg-[#0a0a0c] border border-[#2a2a35] rounded-md px-1.5 py-1 text-[10px] text-white focus:outline-none focus:border-[#526fff]"
                            />
                            <input
                                type="text"
                                value={localConfig.maxTx}
                                onChange={(e) => updateConfig('maxTx', e.target.value)}
                                placeholder="Max"
                                className="bg-[#0a0a0c] border border-[#2a2a35] rounded-md px-1.5 py-1 text-[10px] text-white focus:outline-none focus:border-[#526fff]"
                            />
                        </div>
                    </div>
                </div>

                <div className="px-3 py-2.5 border-t border-[#2a2a35] flex items-center justify-between bg-[#18181a]">
                    <div className="flex items-center gap-1.5">
                        <button className="px-2 py-1.5 bg-[#2a2a35] hover:bg-[#3a3a45] text-[#94a3b8] hover:text-white text-[9px] font-bold rounded-xl transition-colors">
                            Import
                        </button>
                        <button className="px-2 py-1.5 bg-[#2a2a35] hover:bg-[#3a3a45] text-[#94a3b8] hover:text-white text-[9px] font-bold rounded-xl transition-colors">
                            Export
                        </button>
                    </div>
                    <button
                        onClick={handleApply}
                        className="px-3.5 py-1.5 bg-[#526fff] hover:bg-[#465ecc] text-black text-[10px] font-bold rounded-2xl transition-colors flex items-center gap-1.5 shadow-lg shadow-[#526fff]/20"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </div>
    );
};
