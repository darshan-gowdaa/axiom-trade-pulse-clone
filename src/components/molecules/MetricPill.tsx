'use client';

import { type MetricData, type TimeState } from '@/utils/tokenCardHelpers';

interface MetricPillProps {
    metric: MetricData;
    timeState: TimeState;
    isLast?: boolean;
}

export function MetricPill({ metric, timeState, isLast = false }: MetricPillProps) {
    return (
        <div
            className={`flex items-center gap-1 px-1.5 py-0.5 font-semibold rounded-[99px] border border-[#17181f] text-[10px] whitespace-nowrap shrink-0 ${isLast ? 'bg-transparent' : ''
                }`}
        >
            <span style={{ color: metric.color }} className="flex">
                {metric.icon}
            </span>
            <span style={{ color: metric.color }} className="font-medium">
                {metric.val}
                {metric.suffix}
                {metric.isTime && (
                    <span className="ml-[3px]">
                        {timeState.val}
                        {timeState.unit}
                    </span>
                )}
            </span>
        </div>
    );
}
