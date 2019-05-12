(function(){
  function zeroFill(n) {
    if(n >= 10) return n.toString();
    return `0${n}`;
  }
  function normalizeDuration($input, momentDuration) {
    if(!momentDuration) {
      momentDuration = moment.duration($input.duration);
      if(!momentDuration.isValid()) {
        momentDuration = moment.duration($input.value);
      }
      if(!momentDuration.isValid()) return; // don't parse invalid durations
    }
    $input.duration = {
      days: momentDuration.days(),
      hours: momentDuration.hours(),
      minutes: momentDuration.minutes(),
      seconds: momentDuration.seconds(),
    };
  }
  function inputChange($input, $el, interval) {
    const n = Number($el.value);
    if(!Number.isNaN(n)) {
      $input.duration[interval] = n;
    }
    normalizeDuration($input);
    const h = zeroFill($input.duration.days*24+$input.duration.hours);
    const m = zeroFill($input.duration.minutes);
    const s = zeroFill($input.duration.seconds);
    $input.value = `${h}:${m}:${s}`;
  }
  window.addEventListener('load', function() {
    document
      .querySelectorAll('.field-durationpicker')
      .forEach(($el) => {
        console.log($el);
        const $days = $el.querySelector('[data-duration-days]');
        const $hours = $el.querySelector('[data-duration-hours]');
        const $minutes = $el.querySelector('[data-duration-minutes]');
        const $seconds = $el.querySelector('[data-duration-second]');
        const $input = $el.querySelector('input[type=hidden]');
        const momentDuration = moment.duration($input.value);
        if(momentDuration.isValid) {
          $input.duration = {
            days: momentDuration.days(),
            hours: momentDuration.hours(),
            minutes: momentDuration.minutes(),
            seconds: momentDuration.seconds(),
          };
        } else {
          $input.duration = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          };
        }
        if($days) {
          $days.value = $input.duration.days;
          $days.addEventListener('change', () => inputChange($input, $days, 'days'));
        }
        if($hours) {
          $hours.value = $input.duration.hours;
          $hours.addEventListener('change', () => inputChange($input, $hours, 'hours'));
        }
        if($minutes) {
          $minutes.value = $input.duration.minutes;
          $minutes.addEventListener('change', () => inputChange($input, $minutes, 'minutes'));
        }
        if($seconds) {
          $seconds.value = $input.duration.seconds;
          $seconds.addEventListener('change', () => inputChange($input, $seconds, 'seconds'));
        }
      });
  });
}())
