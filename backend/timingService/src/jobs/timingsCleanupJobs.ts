import Timing, { Timing as ITiming }  from '../entity/timing';

// Define the polling function
async function pollAndDeleteUnavailableTimings(): Promise<void> {
  try {
    // Fetch records where all slots have isAvailable as false
    const timings: ITiming[] = await Timing.find({
      slots: { $not: { $elemMatch: { isAvailable: true } } }
    });

    // If timings with all slots unavailable are found, delete them
    for (const timing of timings) {
      await Timing.findByIdAndDelete(timing._id);
      console.log(`Deleted timing record for doctorId: ${timing.doctorId} on date: ${timing.date}`);
    }
  } catch (error) {
    console.error('Error polling and deleting unavailable timings:', error);
  }
}

// Define the interval and start the polling job
const POLL_INTERVAL = 60000; // Poll every 60 seconds (1 minute)
let intervalId: NodeJS.Timeout;

export function startTimingCleanupJob(): void {
  intervalId = setInterval(pollAndDeleteUnavailableTimings, POLL_INTERVAL);
}

// Stop the polling job if needed (optional)
export function stopTimingCleanupJob(): void {
  clearInterval(intervalId);
}
