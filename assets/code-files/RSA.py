#If using an iPhone, iPad, Chromebook, or similar device, please copy and paste all of the code and run it using https://www.onlinegdb.com/online_python_interpreter
#If using a computer, copy this code into whatever IDE you want that can run python!
#RSA_Algorithm_Implementation_2.2
import random
from math import ceil,isqrt
import hashlib
import os
from typing import Callable

def byte_len(n: int) -> int:
    return ceil(n.bit_length() / 8)

def get_n_bit_rand_num(n: int) -> int:
    return random.randrange(2**(n-1)+1,2**n-1)

def rabin_miller_composite_test(a: int, m: int, k: int, n: int) -> bool:
    if (pow(a,m,n) == 1): 
        return False 
    for i in range(k):
        if (pow(a,2**i*m,n) == n-1):
            return False
    return True

def probablistic_is_prime_test(n: int) -> bool:
    first_primes_list = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29,
                     31, 37, 41, 43, 47, 53, 59, 61, 67,
                     71, 73, 79, 83, 89, 97, 101, 103,
                     107, 109, 113, 127, 131, 137, 139,
                     149, 151, 157, 163, 167, 173, 179,
                     181, 191, 193, 197, 199, 211, 223,
                     227, 229, 233, 239, 241, 251, 257,
                     263, 269, 271, 277, 281, 283, 293,
                     307, 311, 313, 317, 331, 337, 347, 349]
    for divisor in first_primes_list:
        if n % divisor == 0:
            return False
    k = 0
    m = n-1
    while (m % 2 == 0):
        m >>= 1 
        k += 1

    iterations = 20 
    for _ in range(iterations):
        a = random.randrange(2,n-1) 
        if rabin_miller_composite_test(a,m,k,n):
            return False
    return True

def get_random_large_prime() -> int:
    num_is_prime = False
    num = 0
    while(num_is_prime == False):
        num = get_n_bit_rand_num(1024)
        if probablistic_is_prime_test(num):
            num_is_prime = True
    return num

def euclidean_algorithm_GCD(larger_num: int, smaller_num: int) -> int:
    if (smaller_num == 0):
        return larger_num
    else:
        return euclidean_algorithm_GCD(smaller_num,larger_num % smaller_num)

def extended_euclidean_algorithm_second_num_of_linear_combination(larger_num: int, smaller_num: int) -> int:
    s = 0
    r = smaller_num
    old_r = larger_num
    old_s = 1
    quotient = 0
    temp = 0
    while (r != 0):
        quotient = old_r // r
        temp = old_r
        old_r = r
        r = temp - quotient * r
        temp = old_s
        old_s = s
        s = temp - quotient * s
    second_num = (old_r - old_s * larger_num) // smaller_num
    return second_num

def generate_keys() -> tuple[int, int, int]:
    primes_are_secure = False
    p = 0
    q = 0
    n = 0
    while(primes_are_secure == False):
        primes_are_secure = True
        p = get_random_large_prime()
        q = get_random_large_prime()
        n = p*q
        if abs(p-q) < isqrt(isqrt(n)):
            primes_are_secure = False
        #No test will be done for pollard's p - 1 algorithm
    phi_of_n = (p-1) * (q-1)
    e = 65537
    while euclidean_algorithm_GCD(phi_of_n,e) != 1:
        e += 1
    d = extended_euclidean_algorithm_second_num_of_linear_combination(phi_of_n,e) % phi_of_n
    return n, e, d

def textbook_encrypt_message(message: bytes, e: int, n: int) -> int:
    int_message = int.from_bytes(message, 'big')
    return pow(int_message,e,n)

def textbook_decrypt_message(encrypted_message: int, d: int, n: int) -> bytes:
    int_message = pow(encrypted_message, d, n)
    return int_message.to_bytes(byte_len(n), 'big')

def encrypt_message_oaep(message: bytes, e: int, n: int) -> int:
    n_byte_length = byte_len(n)
    padded_message = oaep_encode(message,n_byte_length)
    return textbook_encrypt_message(padded_message,e,n)

def decrypt_message_oaep(encrypted_message: int, d: int, n: int) -> str:
    encoded_message = textbook_decrypt_message(encrypted_message, d, n)
    encoded_message_as_bytes = encoded_message
    n_byte_length = byte_len(n)
    message = oaep_decode(encoded_message_as_bytes,n_byte_length)
    return message.decode()

def bytewise_xor(data: bytes, mask: bytes) -> bytes: 
    masked = b""
    for i in range(max(len(data),len(mask))):
        if i < len(data) and i < len(mask):
            masked += (data[i] ^ mask[i]).to_bytes(1, byteorder = 'big')
        elif i < len(data):
            masked += data[i].to_bytes(1, byteorder="big")
        else:
            break
    return masked

def sha256(m: bytes) -> bytes:
    '''SHA-1 hash function'''
    hasher = hashlib.sha256()
    hasher.update(m)
    return hasher.digest()

def sha1(m: bytes) -> bytes:
    '''SHA-1 hash function'''
    hasher = hashlib.sha1()
    hasher.update(m)
    return hasher.digest()

def mgf1(seed: bytes, mlen: int, f_hash: Callable = sha1) -> bytes: 
    '''MGF1 mask generation function with SHA-1'''
    t = b''
    hlen = len(f_hash(b''))
    for c in range(0, ceil(mlen / hlen)):
        _c = c.to_bytes(4, byteorder="big")
        t += f_hash(seed + _c)
    return t[:mlen]

#Don't ask me why OAEP is necessary and how it works, because I don't know.
#Half of the sources about OAEP use Wikipedia as their only source and only care about how to implement OAEP. The other half are academy journals
def oaep_encode(message: bytes, k: int, label: bytes = b"", hash_func: Callable = sha1, mgf: Callable = mgf1) -> bytes: 
    lhash = hash_func(label)
    padding_string = (k - len(message)-2*len(lhash)-2) * b"\x00"
    data_block = lhash + padding_string + b"\x01" + message
    seed = os.urandom(len(lhash))
    data_block_mask = mgf(seed,k-len(lhash)-1,hash_func)
    masked_data_block = bytewise_xor(data_block,data_block_mask)
    seed_mask = mgf(masked_data_block,len(lhash),hash_func)
    masked_seed = bytewise_xor(seed,seed_mask)
    return b"\x00" + masked_seed + masked_data_block

def oaep_decode(encoded_message: bytes, k: int, label: bytes = b"", hash_func: Callable = sha1, mgf: Callable = mgf1) -> bytes:
    lhash = hash_func(label)
    masked_seed = encoded_message[1:1 + len(lhash)]
    masked_data_block = encoded_message[1+len(lhash):]
    seed_mask = mgf(masked_data_block,len(lhash),hash_func)
    seed = bytewise_xor(masked_seed,seed_mask)
    data_block_mask = mgf(seed,k-len(lhash)-1,hash_func)
    data_block = bytewise_xor(masked_data_block, data_block_mask)
    lhash_prime = data_block[:len(lhash)]
    assert(lhash == lhash_prime)
    i = len(lhash)
    while i < len(data_block):
        if data_block[i] == 0:
            i += 1
            continue
        elif data_block[i] == 1:
            i += 1
            break
        else:
            raise Exception('This should never happen.')
    return data_block[i:]

input("WARNING: It has not been verified that this RSA implementation is in accordance with RFC8017. Type anything to proceed")
while(True):
    task = input("What would you like to do? \nPress \"G\" to generate keys \nPress \"D\" to decrypt a message \nPress \"E\" to encrypt a message \nPress \"S\" to give your signature \nPress \"V\" to verify somebody else's signature \nPress \"Q\" to quit!\n").lower()
    match task:
        case "g":
            complete_array = generate_keys()
            print("n: ", complete_array[0])
            print("e: ", complete_array[1])
            print("d: ", complete_array[2])
            print("Remember, n and e are the public keys (they can be shared with anybody!) while d is your private key (Don't let anybody else ever know what d is!)")
        case "d":
            message = int(input("Please enter the message you were sent: "))
            n = int(input("Please enter your value for n: "))
            d = int(input("Please enter your value for d: "))
            print("Your decrypted message is: ")
            print(decrypt_message_oaep(message,d,n))
        case "e":
            message = input("Please enter the message you would like to send: ")
            n = int(input("Please enter the n of the person you would like to send a message to: "))
            e = int(input("Please enter the e of the person you would like to send a message to: "))
            print("Your encrypted message is: ")
            print(encrypt_message_oaep(message.encode(),e,n))
        case "s":
            message = input("Please enter the message you would like to sign (ENSURE THAT YOU NEVER SIGN TWO IDENTICAL MESSAGES, EVER): ")
            n = int(input("Please enter your n: "))
            d = int(input("Please enter your d: "))
            hashed_message = int.from_bytes(sha256(message.encode()),'little')
            print("Your signature for the message is: ")
            print(encrypt_message_oaep(str(hashed_message).encode(),d,n))
        case "v":
            message = input("Please enter the message that the other person signed: ")
            signature = int(input("Please enter the other person's signature: "))
            n = int(input("Please enter the other person's n: "))
            e = int(input("Please enter the other person's e: "))
            hashed_message = int.from_bytes(sha256(message.encode()),'little')
            decrypted_message = decrypt_message_oaep(signature,e,n)
            if (int(decrypted_message) == hashed_message):
                print("The signature is valid! (Signature successfully verified)")
            else:
                print("The signature is invalid! (Signature could not be successfully verified)")
        case "q":
            break