import { error } from '@sveltejs/kit';
import { PUBLIC_STRAPI_URL } from '$env/static/public'
import axios from 'axios';

export async function load({params}) {
    const microappSlug = params.microapp
    const microapp = await axios.get(`${PUBLIC_STRAPI_URL}/api/microapps/?filters[slug][$eq]=${microappSlug}&populate[0]=theme&populate[1]=products.images&populate[2]=products.product_categories&populate[3]=product_categories`)
        .then(
            res => {
                if (!res) throw error(404);
                return res.data.data[0]
            }
        )
    return microapp.attributes
}
