import useAuth from "../hooks/useAuth"

const InformationUser = () => {
    const {auth} = useAuth() 
    return (

        <div className="absolute h-80 w-96 bg-white shadow-xl rounded-md left-[900px] top-3">
            <h1 className="text-center text-2xl">Information: </h1>
            <div className="p-10">
                <h2 className="text-xl p-2">
                    <span className="font-bold">email</span>:{auth.user?.email}
                </h2>
                <h2 className="text-xl p-2">
                    <span className="font-bold">username</span>:{auth.user?.username}
                </h2>
                <h2 className="text-xl p-2">
                    <span className="font-bold">city</span>:{auth.user?.city}
                </h2>
                <h2 className="text-xl p-2">
                    <span className="font-bold">street</span>:{auth.user?.street}
                </h2>
            </div>
        </div>

    )
}

export default InformationUser