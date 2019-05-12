<?php namespace Frater260\Timetracker\FormWidgets;

use Backend\Classes\FormWidgetBase;
use Carbon\CarbonInterval;

/**
 * DurationPicker Form Widget
 */
class DurationPicker extends FormWidgetBase
{
    public $durationParts = [
        'days',
        'hours',
        'minutes',
        'seconds',
    ];

    /**
     * @inheritDoc
     */
    protected $defaultAlias = 'frater260_durationpicker';

    /**
     * @inheritDoc
     */
    public function init()
    {
        $this->fillFromConfig([
            'durationParts',
        ]);
        \Log::debug($this->durationParts);
    }

    /**
     * @inheritDoc
     */
    public function render()
    {
        $this->prepareVars();
        return $this->makePartial('durationpicker');
    }

    /**
     * Prepares the form widget view data
     */
    public function prepareVars()
    {
        if ($value = $this->getLoadValue()) {
            $value = CarbonInterval::fromString($this->value);
            $value = $value->__toString();
        }
        $this->vars['name'] = $this->formField->getName();
        $this->vars['value'] = $this->getLoadValue();
        $this->vars['model'] = $this->model;
        $this->vars['field'] = $this->formField;
    }

    /**
     * @inheritDoc
     */
    public function loadAssets()
    {
        $this->addCss('css/durationpicker.css', 'frater260.timetracker');
        $this->addJs('js/durationpicker.js', 'frater260.timetracker');
    }

    /**
     * @inheritDoc
     */
    public function getSaveValue($value)
    {
        return $value;
    }

    /**
     * Returns field class for partial fields
     * @return string col-md-*:w
     */
    public function getFieldClass() {
        return 'col-md-' . (12/count($this->durationParts));
    }
}
