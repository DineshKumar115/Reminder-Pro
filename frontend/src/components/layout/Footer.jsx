function Footer() {

    return (

        <footer
            className="text-center py-3 mt-5"
            style={{
                color: "#6B7280",
                borderTop: "1px solid #E5E7EB",
                fontSize: "14px"
            }}
        >

            © {new Date().getFullYear()} Reminder Pro • Built with ❤️ using React + FastAPI

        </footer>

    );

}

export default Footer;