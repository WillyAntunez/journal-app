import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: 'willyantunez',
    api_key: '553425163824729',
    api_secret: 'hYOM0rW4hoEUWK_j8nYCRTzyTSA',
    secure: true,
});

describe('Pruebas en fileUpload.js', () => { 

    test('debe de subir el archivo correctamente a cloudinary', async () => {
        const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Cuesta_del_obispo_01.jpg/640px-Cuesta_del_obispo_01.jpg';

        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload( file );

        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.jpg', '');

        await cloudinary.api.delete_resources(['journal/' + imageId]);
    });


    test('Debe de retornar null', async () => {
        const file = new File([], 'foto.jpg');

        const url = await fileUpload( file  );

        expect(url).toBe( null );
    });

})