import styled from 'styled-components'

const SectionLoader = styled.section`
    padding:80px 0;
    & p{
        text-align:center;
    }
`

/**
 * Displays the loader page.
 * @returns {JSX.Element} - The JSX markup for the Loader page component.
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