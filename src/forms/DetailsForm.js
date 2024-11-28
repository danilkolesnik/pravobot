
const DetailsForm = ({ progressIndex, handleSetIndex, documentData }) => {
    
    console.log(documentData);

    return (
        <div className='flex flex-row gap-8 mt-8'>
            <nav className='w-3/5 flex flex-col gap-2 items-left'>
                <button className='p-2 text-left bg-mainBlue'>2.1 ДАННI ПОЗИВАЧА</button>
                <button className='p-2 text-left text-gray-500 border border-gray-400'>2.2 ДАННI ВIДПОВIДАЧА</button>
            </nav>

            <form className="w-full">
                {documentData && documentData.fieldsSlider.map((field) => (
                    <div className="flex flex-wrap gap-3" key={field.id}>
                        <label className='text-l text-black'><span style={{color: 'red'}}>* </span>{field.SectionTitle}</label>
                        {field.slider.map((slide) => (
                            <input
                                key={slide.id}
                                type="text"
                                placeholder={slide.FieldTitle}
                                className="w-full border p-2 rounded text-gray-800"
                            />
                        ))}
                    </div>
                ))}

                {documentData && documentData.questionsSlider.map((question) => (
                    <div className="mt-6 flex flex-wrap gap-3" key={question.id}>
                        <label className='text-l text-black'><span style={{color: 'red'}}>* </span>{question.Question}</label>
                        <select
                                className="w-full border p-2 rounded text-gray-800"
                        >
                            {question.slider.map((answer) => <option key={answer.id}>{answer.Answer}</option> )}
                        </select>
                    </div>
                ))}

                <button type="button" onClick={() => handleSetIndex(progressIndex + 1)} className="w-full mt-6 bg-mainBlue text-white px-4 py-2 rounded">
                    Далі
                </button>

            </form>
        </div>
    );
};

export default DetailsForm;