(function(){
  function zeroFill(n) {
    if(n >= 10) return n.toString();
    return `0${n}`;
  }
  // keep reference to prevent GC collecting instances
  const durationPickers = [];

  class DurationPicker {
    constructor($input, $days, $hours, $minutes, $seconds) {
      this.$input = $input;
      this.$d = $days || null;
      this.$h = $hours || null;
      this.$m = $minutes || null;
      this.$s = $seconds || null;

      this.momentDuration = moment.duration($input.value);

      this.populateInputs();
      if(this.$d) this.$d.addEventListener('change', this.inputChange.bind(this));
      if(this.$h) this.$h.addEventListener('change', this.inputChange.bind(this));
      if(this.$m) this.$m.addEventListener('change', this.inputChange.bind(this));
      if(this.$s) this.$s.addEventListener('change', this.inputChange.bind(this));
    }

    inputChange() {
      this.momentDuration = moment.duration({
        days: this.$d ? Number(this.$d.value) : 0,
        hours: this.$h ? Number(this.$h.value) : 0,
        minutes: this.$m ? Number(this.$m.value) : 0,
        seconds: this.$s ? Number(this.$s.value) : 0,
      });
      this.populateInputs();
    }
    populateInputs() {
      if(this.momentDuration.isValid()) {
        const d = this.momentDuration.days();
        let h = this.momentDuration.hours();
        let m = this.momentDuration.minutes();
        let s = this.momentDuration.seconds();
        // missing larger inputs will be handled properly,
        // but missing smaller ones get ignored. Visually it's just
        // truncating fractional value in the smallest input
        if(this.$d) {
          this.$d.value = d;
        } else {
          h += d*24;
        }
        if(this.$h) {
          this.$h.value = h;
        } else {
          m += h*60;
        }
        if(this.$m) {
          this.$m.value = m;
        } else {
          s += m*60;
        }
        if(this.$s) this.$s.value = s;
        // re-calculate, since d/h/m/s might have got modified above
        const hstr = zeroFill(this.momentDuration.days()*24 + this.momentDuration.hours());
        const mstr = zeroFill(this.momentDuration.minutes());
        const sstr = zeroFill(this.momentDuration.seconds());
        this.$input.value = `${hstr}:${mstr}:${sstr}`;
      }
    }
  }

  window.addEventListener('load', function() {
    document
      .querySelectorAll('.field-durationpicker')
      .forEach(($el) => {
        const $days = $el.querySelector('[data-duration-days]');
        const $hours = $el.querySelector('[data-duration-hours]');
        const $minutes = $el.querySelector('[data-duration-minutes]');
        const $seconds = $el.querySelector('[data-duration-second]');
        const $input = $el.querySelector('input[type=hidden]');
        durationPickers.push(new DurationPicker($input, $days, $hours, $minutes, $seconds));
      });
  });
}())
