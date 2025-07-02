export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="py-10 px-6 mt-20">
            <div className="max-w-5xl mx-auto text-center space-y-4">
                {/* Tagline */}
                <p className="text-gray-700 text-sm">
                    Built & designed by <span className="font-medium text-violet-600">Zain S.</span>
                </p>
                {/* Copyright */}
                <p className="text-gray-400 text-xs">
                    &copy; {year} All rights reserved.
                </p>
            </div>
        </footer>
    )
}