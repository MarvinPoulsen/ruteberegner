import React, { FC, useState } from 'react';
import Autocomplete from '../dawa/Autocomplete';
import './form.scss';

interface FormProps {
    data: any;
    onCalculate: (
        schoolId: number,
        toCoord: string,
    ) => void;
    kommunenr: string;
    maxSuggestions: number;
}

const Form: FC<FormProps> = (props: FormProps) => {
    const [schoolId, setSchoolId] = useState<number>();
    const [school, setSchool] = useState<string|null>(null);
    const options = props.data;
    const [endPoint, setEndPoint] = useState<string|null>(null);

    const onSelected = (coord) => {
        setEndPoint(coord);
    };
    const handleSelectedOption = (event) => {
        const schoolId = parseInt(event.target.value);
        const school = props.data.find((item) => item.id === schoolId);
        setSchoolId(schoolId);
        setSchool(school.skole);
    };
    const formHasValues = !school || !endPoint ? true : false;
    const handleClick = (event) => {
        event.preventDefault();
        if (schoolId && endPoint)
        props.onCalculate(schoolId, endPoint);
    };
const handleClearInput = ()=> {
    setEndPoint(null);
}
    return (
        <>
            <form>
                <div className="field">
                        <label className="label">Skole</label>
                        <div className="select">
                            <select
                                onChange={handleSelectedOption}
                                name="schoolId"
                                value={schoolId}
                            >
                                <option key="0" value="0" hidden></option>
                                {options.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.skole}
                                    </option>
                                ))}
                            </select>
                        </div>
                    {/* </div> */}
                </div>

                <Autocomplete 
                    onAdresSelected={onSelected}
                    maxSuggestions={props.maxSuggestions}
                    onClearInput={handleClearInput}
                    kommunenr={props.kommunenr}
                />

                <div className="field is-grouped">
                    <div className="control">
                        <button
                            className="button is-link"
                            disabled={formHasValues}
                            onClick={handleClick}
                        >
                            Beregn
                        </button>
                    </div>
                    <div className="control">
                        <button 
                            className="button is-link is-light"
                        >
                            Slet alt
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Form;
