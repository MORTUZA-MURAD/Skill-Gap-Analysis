import React from 'react';

interface StatusBadgeProps {
  status: 'pending' | 'approved' | 'completed' | 'rejected' | string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const normalizedStatus = status.toLowerCase();

  const getStyles = () => {
    switch (normalizedStatus) {
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800';
      case 'approved':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800';
      case 'rejected':
        return 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const getLabel = () => {
    switch (normalizedStatus) {
      case 'pending':
        return 'Pending';
      case 'approved':
        return 'Approved';
      case 'completed':
        return 'Completed';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStyles()} ${className}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
          normalizedStatus === 'pending'
            ? 'bg-amber-500 animate-pulse'
            : normalizedStatus === 'approved'
            ? 'bg-emerald-500'
            : normalizedStatus === 'completed'
            ? 'bg-blue-500'
            : 'bg-rose-500'
        }`}
      />
      {getLabel()}
    </span>
  );
};

export default StatusBadge;
