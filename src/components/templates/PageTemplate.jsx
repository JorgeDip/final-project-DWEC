function PageTemplate({ children, header, footer }) {
    return (
        <>
            {header}
            <main className="page-template">
                {children}
            </main>
            {footer}
        </>
    );
}

export default PageTemplate;