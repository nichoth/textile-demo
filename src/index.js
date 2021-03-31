import { Buckets, UserAuth } from '@textile/hub'

const getOrCreate = async (auth, bucketName) => {
    const buckets = Buckets.withUserAuth(auth)
    // Automatically scopes future calls on `buckets` to the Thread containing the bucket
    const { root, threadID } = await buckets.getOrCreate(bucketName)
    if (!root) throw new Error('bucket not created')
    const bucketKey = root.key
    return { buckets, bucketKey }
}

// This method requires that you run "getOrCreate" or have specified "withThread"
async function logLinks (buckets, bucketKey) {
    const links = await buckets.links(bucketKey)
    console.log(links)
}

