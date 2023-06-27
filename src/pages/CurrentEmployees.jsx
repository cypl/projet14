import { GetDataEmployees } from "../api/Api"

function CurrentEmployees(){

    const employees = GetDataEmployees()

    return(
        <main>
            <section className="content_width">
                <p>Here, you can see all current employees.</p>
                {employees.isLoaded && employees.isError === null &&
                    employees.data.map((e, index) => (
                        <p key={index}>{e.firstName}</p>
                    ))
                }
            </section>
        </main>
    )
}

export default CurrentEmployees