import json

from PIL import Image
import base64,zlib


def decode_blueprint(blueprint:str)->dict:
    return json.loads((zlib.decompress(base64.standard_b64decode(blueprint[1:]))))

def encode_blueprint(jsn:dict)->str:
    return '0'+base64.standard_b64encode(zlib.compress(json.dumps(jsn).encode('utf-8'),9)).decode('utf-8')



myobj={"blueprint":{"icons":[{"signal":{"type":"virtual","name":"signal-0"},"index":1}],"entities":[{"entity_number":1,"name":"substation","position":{"x":0,"y":0},"neighbours":[2]},{"entity_number":2,"name":"substation","position":{"x":5,"y":5},"neighbours":[1]},{"entity_number":3,"name":"small-lamp","position":{"x":2.5,"y":2.5}},{"entity_number":4,"name":"small-lamp","position":{"x":3.5,"y":3.5}}],"item":"blueprint","version":281479276527617}}
myblu='0eNqdkm2LwyAMx79LXrsxbb22fpVjHHYLQ9C0VHtcKX73ace4ctfBthc+RJP/L9HM0NoR+8FQADWDOXXkQX3O4M2FtM1nYeoRFJiADhiQdtnyY+uDDqYjiAwMnfEHFI9HBkjBBIM3lcWYvmh0LQ7JYSueQd95s2wTLcns6obBlFZR1Ek8pUR4yvc+O/A8XQZEWhPMGVQRjzFG9o8qfqlOW7uz2vVbVLGXd+5hL7eUipeVRJOUXqiBr6jZlg9qKp/M5PB2Jo/I8kkyf5tc/nmD27+m1lpaUK06lsE3Dn6hipqXVSOqD5kGr2K8ArpN768='
# print(str(decode_blueprint(myblu)).replace("'",'"'))

# print(encode_blueprint(myobj))



# basewidth = 34
# baseh=38
# img = Image.open('stalin.jpg')
# # wpercent = (basewidth/float(img.size[0]))
# # hsize = int((float(img.size[1])*float(wpercent)))
# img = img.resize((basewidth,baseh), Image.Resampling.LANCZOS)
# img.save('stalinnew.jpg')



# entities=[]
# wmax,hmax=10,10
# i,j=0,0

# while i<hmax:
#     while j<wmax:
#         entity={
#             "entity_number": (i*wmax)+j,
#             "name": "small-lamp",
#             "position": {
#               "x": j+0.5,
#               "y": i+0.5
#             },
#             "connections": {
#               "1": {
#                 "green": [
#                     (
#                         {
#                             "entity_id": (i*wmax)+j-1
#                         } if j-1>=0 else 
#                         {
#                             "entity_id":j*(i-1)
#                         } if i-1>=0 else None
#                     ),
#                     (
#                         {
#                             "entity_id":(i*wmax)+j+1
#                         } if j+1!=wmax else None 
#                     )
#                 ]
#               }
#             }
#         }
#         entities.append(entity)
#         j+=1
#     j=0
#     i+=1  



# result={
#   "blueprint": {
#     "icons": [
#       {
#         "signal": {
#           "type": "item",
#           "name": "substation"
#         },
#         "index": 1
#       }
#     ],
#     "entities":entities,
#     "item": "blueprint",
#     "version": 281479276527617
#   }
# }


# print(str(result).replace("'",'"').replace('None','"None"'))
# print(encode_blueprint(result))



