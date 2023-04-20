import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { Field, Form, Formik, LabelSubmit, Submit, Wrapper } from "./Searchbar.styled";

function Searchbar({ onSubmit }) {
    const [valueQuery, setValueQuery] = useState('');

    const handleField = e => {
        const valueQuery = e.currentTarget.value;
        setValueQuery(valueQuery);
    };

    const handleSubmit = () => {

        const normalizedValueQuery = valueQuery.toLocaleLowerCase();

        onSubmit(normalizedValueQuery);
        setValueQuery('');
    };

        return (
            <Wrapper>
                <Formik 
                initialValues={{
                    query: '',
                  }} 
                onSubmit={handleSubmit} >
                    <Form>
                        <Submit type="submit">
                            <BiSearchAlt size="2em" />
                            <LabelSubmit>Search</LabelSubmit>
                        </Submit>
                        <Field  
                            type="text"
                            name="query"
                            value={valueQuery}
                            autoComplete="off"
                            autoFocus
                            placeholder="Search images and photos" 
                            onChange={handleField}
                        />
                    </Form>
                </Formik>
            </Wrapper>
        );
};

export default Searchbar;
