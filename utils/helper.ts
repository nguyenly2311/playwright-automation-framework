export const sleep=(ms:number)=>new Promise(r=>setTimeout(r,ms));

export class Decoder {

    static decode(value: string): string {
        const binary = atob(value);
        const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
        return new TextDecoder().decode(bytes);
    }

}