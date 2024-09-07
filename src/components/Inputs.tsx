import React from "react";
import { CardAttribute, CardColor, CardType, Rarity } from "@types";

interface CheckboxProps {
    field_name: string;
    label: string;
    enumProp: typeof CardColor | typeof CardAttribute;
    selectedValues?: string[];
}

export function CheckboxInput({ field_name, label, enumProp, selectedValues = [] }: CheckboxProps) {
    return (
        <div className="w-full mb-2">
            <label>{label}</label>
            <div className="flex flex-wrap gap-4">
                {Object.values(enumProp).map((attr) => (
                    attr !== "" && (
                        <div key={attr} className="flex items-center space-x-2" >
                            {selectedValues.includes(attr) ?
                                (
                                    <input
                                        type="checkbox"
                                        id={`${field_name}-${attr}`}
                                        name={field_name}
                                        value={attr}
                                        className="checkbox-class"
                                        defaultChecked
                                    />
                                ) :
                                (
                                    <input
                                        type="checkbox"
                                        id={`${field_name}-${attr}`}
                                        name={field_name}
                                        value={attr}
                                        className="checkbox-class"
                                    />
                                )
                            }
                            <label htmlFor={`${field_name}-${attr}`}>{attr}</label>
                        </div>
                    )
                ))}
            </div>
        </div >
    );
}

interface SelectProps {
    field_name: string;
    label: string;
    enumProp: typeof Rarity | typeof CardType;
    selectedValue?: string;
}

export function SelectInput({ field_name, label, enumProp, selectedValue }: SelectProps) {
    return (
        <div className="flex flex-col w-full mb-2">
            <label htmlFor={field_name}>{label}</label>
            <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name={field_name}
                id={field_name}
            >
                <option value="">Any {field_name}</option>
                {Object.entries(enumProp).map(([key, value]) => (
                    <option key={value} value={value} selected={value === selectedValue}>
                        {key.replace(/_/g, ' ')
                            .toLowerCase()
                            .replace(/\b\w/g, char => char.toUpperCase())}
                    </option>
                ))}
            </select>
        </div>
    );
}

interface TextProps {
    field_name: string;
    input_type: string;
    placeholder?: string
    label: string;
    defaultValue?: string;
}

export function TextInput({ field_name, input_type, placeholder, label, defaultValue }: TextProps) {
    return (
        <div className="flex flex-col w-full mb-2">
            <label htmlFor={field_name}>{label}</label>
            <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type={input_type}
                id={field_name}
                name={field_name}
                placeholder={placeholder}
                defaultValue={defaultValue}
            />
        </div>
    )
}