

export const UserForm = ({user, change, save, remove}) => {
    
    

    return(
        <>
            <form onSubmit={save}>
                    <div>
                        <label htmlFor="firstName"></label>
                        <input type="text" name="first_name" value={user.first_name} onChange={change}/>
                    </div>
                    <div>
                        <label htmlFor="lastName"></label>
                        <input type="text" name="last_name" value={user.last_name} onChange={change}/>
                    </div>
                    <div>
                        <label htmlFor="job"></label>
                        <select name="job" id="job" onChange={change}>
                            <option value="true">Room Service</option>
                            <option value="false">Manager</option>
                            <option value="false">Recepcionist</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="email"></label>
                        <input type="email" name="email" value={user.email} onChange={change}/>
                    </div>
                    <div>
                        <label htmlFor="phone"></label>
                        <input type="tel" name="phone" value={user.phone} onChange={change}/>
                    </div>
                    
                    <div>
                        <label htmlFor="description"></label>
                        <textarea name="description" id="description" cols="30" rows="10" value={user.description} onChange={change}></textarea>
                    </div>
                    <div>
                        <label htmlFor="status"></label>
                        <select name="status" id="status" onChange={change}>
                            <option value="Status">Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <div>
                        <button type="submit">Save Changes</button>
                        <button onClick={remove}>Delete User</button>
                    </div>
                </form>
        </>
    )
}