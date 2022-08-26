#include "yespower-YESPOWER_1_0_1/yespower.h"
#include <unistd.h>
#include <math.h>

typedef uint32_t u32;
typedef uint8_t u8;

#define MAX_NONCE 0xffffffff
#define NUM_HASHES 16

#define swap_endianess32(val) (((val >> 24u) & 0xffu) | ((val >> 8u) & 0xff00u) | ((val << 8u) & 0xff0000u) | ((val << 24u) & 0xff000000u))

u32 check(u32 *hash, u32 *target)
{

    // convertire in little endian

    for (int i = 0; i < 8; i++)
    {
        if (hash[i] < target[i])
        {
            return 1u;
        }
        else if (hash[i] > target[i])
        {
            return 0u;
        }
    }

    return 0u;
}

void yespower10(u32 *header, u32 *target, u32 *res)
{

    res[0] = 0;
    res[1] = 0;

    u32 nonce = 0;

    // loops over possible nonces
    while (1)
    {
        // ensures lightweight mining
        sleep(1);

        for (u32 i = 0; i < NUM_HASHES; i++)
        {
            yespower_params_t params = {YESPOWER_1_0, 2048, 32, NULL, 0};
            yespower_binary_t hash;
            header[19] = nonce;
            int r = yespower_tls((u8 *)header, 80, &params, &hash);
            // TODO check r

            u32 *hash32 = (u32 *)&hash;
            hash32[0] = hash32[7];
            hash32[1] = hash32[6];
            hash32[2] = hash32[5];
            hash32[3] = hash32[4];
            hash32[4] = hash32[3];
            hash32[5] = hash32[2];
            hash32[6] = hash32[1];
            hash32[7] = hash32[0];

            u32 found = check(hash32, target);

            if (found)
            {
                res[0] = 1;
                res[1] = nonce;
                res[2] = hash32[0];
                res[3] = hash32[1];
                res[4] = hash32[2];
                res[5] = hash32[3];
                res[6] = hash32[4];
                res[7] = hash32[5];
                res[8] = hash32[6];
                res[9] = hash32[7];
                return;
            }

            if (nonce == MAX_NONCE)
            {
                return;
            }
            nonce++;
        }
    }
}

void yespower10_test(u32 *header, u32 *res)
{
    yespower_params_t params = {YESPOWER_1_0, 2048, 32, NULL, 0};
    yespower_binary_t hash;
    int r = yespower_tls((u8 *)header, 80, &params, &hash);

    u32 *hash32 = (u32 *)&hash;

    res[0] = 0;
    res[1] = 0;
    res[2] = swap_endianess32(hash32[7]);
    res[3] = swap_endianess32(hash32[6]);
    res[4] = swap_endianess32(hash32[5]);
    res[5] = swap_endianess32(hash32[4]);
    res[6] = swap_endianess32(hash32[3]);
    res[7] = swap_endianess32(hash32[2]);
    res[8] = swap_endianess32(hash32[1]);
    res[9] = swap_endianess32(hash32[0]);
}