import React from 'react';
import '@appdirect/sfb-theme-components/src/components/atoms-showcase/styles/AtomsShowcase.scss'
import PropTypes from 'prop-types';
import withListener from '@appdirect/sfb-theme-components/src/components/withListener';
import Button from '@appdirect/sfb-theme-components/src/atoms/button/Button';
import { createNamespace } from '@appdirect/sfb-theme-components/src/tools/namingTools';

import { INPUT, TOGGLE, TEXTAREA, COLORPICKER, DROPDOWN, 
    RADIO, CHECKBOX, SLIDER, GROUP_HEADER, SPACER 
} from '@appdirect/sfb-theme-components/src/constants/schemaComponentTypes';


const n = createNamespace('AtomsShowcase');

export const AtomsShowcaseComponent = props => {
    const { settings = {} } = props;
    const { title,
        description,
        ctaButton,
        ctaButtonLabel,
        headerType,
        descriptionSize,
        textStyling,
        textOpacity } = settings;
    const handleCTAClick = evt => {
        evt.preventDefault();
        alert('Hello!');
    };
    const modifiers = [descriptionSize];

    if (textStyling && textStyling.length) {
        modifiers.push(...textStyling);
    }
    const styleProps = Object.assign({},
        textOpacity && {
            style: { opacity: textOpacity }
        });

    return (
        <div {...n('container').withTestId().props}>
            <div {...n('column').props}>
                {headerType === 'header1' && <h1>{title}</h1>}
                {headerType === 'header2' && <h2>{title}</h2>}
                {headerType === 'header3' && <h3>{title}</h3>}
                {headerType === 'header4' && <h4>{title}</h4>}
                {headerType === 'header5' && <h5>{title}</h5>}
                {!headerType && <span>{title}</span>}
                {description && <p {...n('description', modifiers).withTestId().props} {...styleProps}>{description}</p>}
            </div>
            <div {...n('column').props}>
                {(ctaButton === true || ctaButton === 'true') && (
                    <Button type="primary" onClick={handleCTAClick}>
                        {ctaButtonLabel}
                    </Button>
                )}
            </div>
        </div>
    );
};

const HEADER_TYPE_OPTIONS = [
    { value: 'header1', label: 'uieditor.sfbComponent.atomsShowcase.headerType.option.header1', caption: 'uieditor.sfbComponent.atomsShowcase.sampleCaption' },
    { value: 'header2', label: 'uieditor.sfbComponent.atomsShowcase.headerType.option.header2', caption: 'uieditor.sfbComponent.atomsShowcase.sampleCaption' },
    { value: 'header3', label: 'uieditor.sfbComponent.atomsShowcase.headerType.option.header3', caption: 'uieditor.sfbComponent.atomsShowcase.sampleCaption' },
    { value: 'header4', label: 'uieditor.sfbComponent.atomsShowcase.headerType.option.header4', caption: 'uieditor.sfbComponent.atomsShowcase.sampleCaption' },
    { value: 'header5', label: 'uieditor.sfbComponent.atomsShowcase.headerType.option.header5', caption: 'uieditor.sfbComponent.atomsShowcase.sampleCaption' }
];

const DESCRIPTION_SIZE_OPTIONS = [
    { value: 'bigger', label: 'uieditor.sfbComponent.atomsShowcase.descriptionSize.option.bigger', caption: 'uieditor.sfbComponent.atomsShowcase.sampleCaption' },
    { value: 'standard', label: 'uieditor.sfbComponent.atomsShowcase.descriptionSize.option.standard', caption: 'uieditor.sfbComponent.atomsShowcase.sampleCaption' },
    { value: 'smaller', label: 'uieditor.sfbComponent.atomsShowcase.descriptionSize.option.smaller', caption: 'uieditor.sfbComponent.atomsShowcase.sampleCaption' }
];

const TEXT_STYLING_OPTIONS = [
    { value: 'bold', label: 'uieditor.sfbComponent.atomsShowcase.textStyling.option.bold' },
    { value: 'italic', label: 'uieditor.sfbComponent.atomsShowcase.textStyling.option.italic' },
    { value: 'strikethrough', label: 'uieditor.sfbComponent.atomsShowcase.textStyling.option.strikethrough' },
    { value: 'underline', label: 'uieditor.sfbComponent.atomsShowcase.textStyling.option.underline' }
];

AtomsShowcaseComponent.schema = () => ({
    name: 'AtomsShowcase',
    title: 'uieditor.sfbComponent.atomsShowcase.title',
    iconName: 'carousel',
    form: {
        title: {
            title: 'uieditor.sfbComponent.atomsShowcase.title.title',
            placeholder: 'uieditor.sfbComponent.atomsShowcase.title.placeholder',
            defaultValue: 'uieditor.sfbComponent.atomsShowcase.title.defaultValue',
            type: INPUT,
            required: true,
            validation: {
                pattern: /^[a-zA-Z0-9 ]+$/gm,
                message: 'uieditor.sfbComponent.input.validation.message'
            }
        },
        spacer: {
            type: GROUP_HEADER,
            title: 'uieditor.sfbComponent.atomsShowcase.spacer.title',
            symbol: 'button-settings'
        },
        ctaButton: {
            labelOn: 'uieditor.sfbComponent.atomsShowcase.ctaButton.labelOn',
            labelOff: 'uieditor.sfbComponent.atomsShowcase.ctaButton.labelOff',
            defaultValue: false,
            type: TOGGLE
        },
        ctaButtonLabel: {
            title: 'uieditor.sfbComponent.atomsShowcase.ctaButtonLabel.title',
            placeholder: 'uieditor.sfbComponent.atomsShowcase.ctaButtonLabel.placeholder',
            defaultValue: 'uieditor.sfbComponent.atomsShowcase.ctaButtonLabel.defaultValue',
            type: INPUT,
            required: true,
            validation: {
                pattern: /^[a-zA-Z0-9 ]+$/gm,
                message: 'uieditor.sfbComponent.input.validation.message'
            }
        },
        ctaButtonColor: {
            title: 'uieditor.sfbComponent.atomsShowcase.ctaButtonColor.title',
            defaultValue: '#ffffff',
            type: COLORPICKER
        },
        spacer2: {
            type: SPACER
        },
        description: {
            title: 'uieditor.sfbComponent.atomsShowcase.description.title',
            defaultValue: 'uieditor.sfbComponent.atomsShowcase.description.defaultValue',
            type: TEXTAREA,
            required: true,
            validation: {
                pattern: /^[a-zA-Z0-9 ]+$/gm,
                message: 'uieditor.sfbComponent.input.validation.message'
            }
        },
        headerType: {
            title: 'uieditor.sfbComponent.atomsShowcase.headerType.title',
            type: DROPDOWN,
            required: true,
            defaultValue: HEADER_TYPE_OPTIONS[1].value,
            options: HEADER_TYPE_OPTIONS,
            validation: {
                availableOptions: HEADER_TYPE_OPTIONS.map(({ value }) => value),
                message: 'uieditor.sfbComponent.dropdown.validation.message',
                default: 'uieditor.sfbComponent.dropdown.defaultValue'
            }
        },
        descriptionSize: {
            title: 'uieditor.sfbComponent.atomsShowcase.descriptionSize.title',
            type: RADIO,
            required: true,
            defaultValue: DESCRIPTION_SIZE_OPTIONS[1].value,
            options: DESCRIPTION_SIZE_OPTIONS,
            validation: {
                availableOptions: DESCRIPTION_SIZE_OPTIONS.map(({ value }) => value),
                message: 'uieditor.sfbComponent.radio.validation.message'
            }
        },
        textStyling: {
            title: 'uieditor.sfbComponent.atomsShowcase.textStyling.title',
            type: CHECKBOX,
            required: false,
            defaultValue: [],
            options: TEXT_STYLING_OPTIONS,
            validation: {
                availableOptions: TEXT_STYLING_OPTIONS.map(({ value }) => value),
                message: 'uieditor.sfbComponent.checkbox.validation.message'
            }
        },
        textOpacity: {
            title: 'uieditor.sfbComponent.atomsShowcase.textOpacity.title',
            type: SLIDER,
            required: false,
            defaultValue: 1,
            options: {
                step: 0.1,
                min: 0.1,
                max: 1
            },
            validation: {
                availableOptions: {
                    step: 0.1,
                    min: 0.1,
                    max: 1
                },
                message: 'uieditor.sfbComponent.slider.validation.message'
            }
        }
    }
});

const SETTINGS = AtomsShowcaseComponent.schema().form;

AtomsShowcaseComponent.propTypes = {
    settings: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        ctaButton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
        ctaButtonLabel: PropTypes.string,
        headerType: PropTypes.string,
        descriptionSize: PropTypes.string,
        textStyling: PropTypes.array,
        textOpacity: PropTypes.number
    })
};

AtomsShowcaseComponent.defaultProps = {
    settings: {
        title: SETTINGS.title.defaultValue,
        description: SETTINGS.description.defaultValue,
        ctaButton: SETTINGS.ctaButton.defaultValue,
        ctaButtonLabel: SETTINGS.ctaButtonLabel.defaultValue,
        ctaButtonColor: SETTINGS.ctaButtonColor.defaultValue,
        headerType: SETTINGS.headerType.defaultValue,
        descriptionSize: SETTINGS.descriptionSize.defaultValue,
        textStyling: SETTINGS.textStyling.defaultValue,
        textOpacity: SETTINGS.textOpacity.defaultValue
    }
};

export default withListener(AtomsShowcaseComponent);
