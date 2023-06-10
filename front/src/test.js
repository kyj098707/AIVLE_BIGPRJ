const handleRegisterButton = () => {
    // console.log(editorRef.current?.getInstance().getHTML());
    // console.log(editorRef.current?.getInstance().getMarkdown());

    let contents = editorRef.current?.getInstance().getHTML();

    async function fn() {
        // const token = localStorage.getItem("access");
        const headers = {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg2MzI2MzgyLCJpYXQiOjE2ODYzMDgzODIsImp0aSI6IjVkMzBkMGZjYWU4ZTQ0NzM4MTI2NjcxZjk4NThhYmZkIiwidXNlcl9pZCI6M30.GNPecUg3yPwdmd9FFdVSkxvZF-JkOLElavdTbZ_FTbA`,
        };

        axios.post(
            "http://localhost:8000/api/boards/create/",
            {
                "title": name,
                "contents": contents,
            },
            { "headers": headers }
        ).then(response => {
            console.log(response)

        })
            .catch(error => {
                console.log(error);
            });;
        console.log(name);
        console.log(contents);
        console.log(headers);
    }
    fn();
};