class gw_countdown {
	constructor(el, date, startIn, lifeTime, tz, dd) {
		this.el = el;
		this.startTime = luxon.DateTime.fromSQL(date, {
			zone: tz
		});
		this.tz = tz;
		this.startIn = startIn || "Start in";
		this.lifeTime = lifeTime || "Life time";
		this.dd = dd;
	}
	update() {
		let dateNow = luxon.DateTime.now();

		let obj = this.startTime
			.diff(dateNow, ["days", "hours", "minutes", "seconds"])
			.toObject();
		let days = Math.abs(Math.round(obj.days));
		let hours = Math.abs(Math.round(obj.hours));
		let minutes = Math.abs(Math.round(obj.minutes));
		let seconds = Math.abs(Math.round(obj.seconds));

		let html = `
        <div class="countdown">
            <div class="countdown__counter">
                <div class="bonuses-counter">
                    <div class="bonuses-counter__item">
                        <div class="bonuses-counter__value">${days}</div>
                        <div class="bonuses-counter__label">${numDecline(days,this.dd[0])}</div>
                    </div>
                    <div class="bonuses-counter__item">
                        <div class="bonuses-counter__value">${String(hours).padStart(2,"0")}</div>
								<div class="bonuses-counter__label">${numDecline(hours,this.dd[1])}</div>
                    </div>
                    <div class="bonuses-counter__item">
                        <div class="bonuses-counter__value">${String(minutes).padStart(2, "0")}</div>
								<div class="bonuses-counter__label">${numDecline(minutes,this.dd[2])}</div>
                    </div>
						  <div class="bonuses-counter__item">
                        <div class="bonuses-counter__value">${String(seconds).padStart(2, "0")}</div>
								<div class="bonuses-counter__label">${numDecline(seconds,this.dd[3])}</div>
                    </div>
                </div>
            </div>
        </div>
        `;
		this.el.innerHTML = html;

		setTimeout(() => {
			this.update();
		}, 1000);
	}
}


function numDecline(n, titles) {
	return titles[
		1 === n % 10 && 11 !== n % 100
			? 0
			: 2 <= n % 10 && 4 >= n % 10 && (10 > n % 100 || 20 <= n % 100)
			? 1
			: 2
	];
}

document.addEventListener("DOMContentLoaded", function () {
	const timers = document.querySelectorAll('[data-timer-start-time]');
  if (timers.length) {
    for (const timer of timers) {
      let countdown = new gw_countdown(
        timer,
        timer.getAttribute("data-timer-start-time"),
        timer.getAttribute("data-timer-before"),
        timer.getAttribute("data-timer-after"),
        timer.getAttribute("data-timer-time-zone"),
        __config.timer.dd
      );
      countdown.update();
    };
  }
});
