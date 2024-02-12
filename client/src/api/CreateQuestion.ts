const API = 'http://localhost:3000/api/question/create'
export const createQuestion = async (data: any) => {
    try {
        const res = await fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            console.log('Blog added successfully');
        } else {
            console.log('Failed to add blog');
        }
    } catch (error) {
        console.error('Error creating blog:', error);

    }

} 