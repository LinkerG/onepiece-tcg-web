import React from "react";
import { FormEvent } from "react";
import { CardAttribute, CardColor, CardType, Rarity } from "../../app/types";
import { TextInput, SelectInput, CheckboxInput } from "../Inputs";
import { useCardQuery, useClearCardQuery, useSetCardQuery } from "../../hooks/useCardSearch";
import { useNavigate } from "react-router-dom";

export function FilterCardForm() {
    const setSearchParams = useSetCardQuery()
    const resetSearchParams = useClearCardQuery()
    const navigate = useNavigate();
    const parameters = useCardQuery()

    function handleFormAction(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const query: Record<string, any> = {};

        formData.forEach((value, key) => {
            if (value && value.toString().trim() !== "") {
                // Solo las keys color, attribute y card_type deben ser arrays
                if (["color", "attribute", "card_type"].includes(key)) {
                    if (query[key]) {
                        query[key].push(value);
                    } else {
                        query[key] = [value];
                    }
                } else {
                    // Para las demás keys, asignamos el valor directamente
                    query[key] = value;
                }
            }
        });

        setSearchParams(query);
    }

    function clearFilters() {
        navigate(window.location.pathname);
        resetSearchParams()

        const checkboxes = document.querySelectorAll("input[type='checkbox']");
        if (checkboxes) {
            checkboxes.forEach((checkbox: any) => {
                checkbox.checked = false;
            });
        }
        const textBoxes = document.querySelectorAll("input[type='text']");
        if (textBoxes) {
            textBoxes.forEach((textBox: any) => {
                textBox.value = "";
            });
        }
        const options = document.querySelectorAll("option");
        if (options) {
            options.forEach((option: any) => {
                if (option.value === "") option.selected = true
                else option.selected = false
            });
        }
    }

    return (
        <form onSubmit={handleFormAction} className="p-4 bg-white">
            <div className="space-y-4">
                <div className="w-full">
                    <TextInput
                        field_name="card_id"
                        placeholder="OP01-001"
                        input_type="text"
                        label="Card ID"
                        defaultValue={parameters.card_id}
                    />
                </div>
                <TextInput
                    field_name="name"
                    placeholder="Monkey.D.Luffy"
                    input_type="text"
                    label="Card name"
                    defaultValue={parameters.name}
                />
                <SelectInput
                    field_name="rarity"
                    enumProp={Rarity}
                    label="Rarity"
                    selectedValue={parameters.rarity}
                />
                <SelectInput
                    field_name="type"
                    enumProp={CardType}
                    label="Type"
                    selectedValue={parameters.type}
                />
                <CheckboxInput
                    field_name="attribute"
                    label="Attribute"
                    enumProp={CardAttribute}
                    selectedValues={parameters.attribute}
                />
                <CheckboxInput
                    field_name="color"
                    label="Color"
                    enumProp={CardColor}
                    selectedValues={parameters.color}
                />
            </div>
            <button type="submit"
                className="w-full mt-6 focus:outline-none text-white bg-red-500 hover:bg-red-600 focus:ring-2 focus:bg-red-700 focus:ring-red-600 font-medium rounded-lg text-sm px-5 py-2.5"
            >
                Search
            </button>
            <button type="button"
                onClick={() => clearFilters()}
                className="w-full mt-6 focus:outline-none text-gray-700 border bg-white hover:bg-gray-100 focus:ring-2 focus:bg-gray-200 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
            >
                Clear filters
            </button>
        </form>
    );
}