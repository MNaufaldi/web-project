
const CreateAssignment = () => {
    return (
        <div>
            <form className="ui form">
                <div className="field">
                    <label>Title</label>
                    <input type="text" name="title" placeholder="Title"></input>
                </div>
                <div className="field">
                    <label>Description</label>
                    <textarea></textarea>
                </div>
                <div className="field">
                    <label>Date</label>
                    <div className="ui calendar">
                        <div className="ui input left icon">
                            <i class="calendar icon"></i>
                            <input type="text" placeholder="Pick up a date" name="date"></input>
                        </div>        
                    </div>
                </div>
                <button class="ui primary button">Save</button>
                <button class="ui button">Discard</button>
            </form>
        </div>
    )
}

export default CreateAssignment
