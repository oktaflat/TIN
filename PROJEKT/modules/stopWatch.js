/** @module stopwatch */
export class Timer {
  constructor() {
    this.isRunning = false;
    this.timeStart = 0;
    this.timePassed = 0;
  }

  /**
   * Gets time since last timeStart
   * @returns {number} - time in millis
   */
  getTimeSinceLastStart() {
    if (!this.timeStart) {
      return 0;
    }
    return Date.now() - this.timeStart;
  }

  /**
   * Starts timer
   */
  start() {
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;
    this.timeStart = Date.now();
  }

  /**
   * Pauses timer
   */
  pause() {
    if (!this.isRunning) {
      return;
    }
    this.isRunning = false;
    this.timePassed += this.getTimeSinceLastStart();
  }

  /**
   * Unpauses timer
   */
  unpause() {
    if (this.isRunning === false && this.timeStart !== 0) {
      this.isRunning = true;
      this.timeStart = Date.now();
    }
  }

  /**
   * Resets timer
   */
  reset() {
    this.isRunning = false;
    this.timeStart = 0;
    this.timePassed = 0;
  }

  /**
   * Gets current time
   * @returns {number} - time in millis
   */
  getTime() {
    if (!this.timeStart) {
      return 0;
    }
    if (this.isRunning) {
      return this.timePassed + this.getTimeSinceLastStart();
    }
    return this.timePassed;
  }
}
