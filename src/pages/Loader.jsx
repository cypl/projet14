import styled from 'styled-components'

const SectionLoader = styled.section`
    & p{
        text-align:center;
    }
`

/**
 * Displays the error page.
 * @returns {JSX.Element} - The JSX markup for the Error page component.
 */
function Loader(){
    return(
        <main>
            <SectionLoader className="content_width">
                <p>Loading…</p>
            </SectionLoader>
        </main>
    )
}

export default Loader