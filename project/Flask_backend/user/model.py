import gc
from importlib.resources import path
from operator import mod
import os
from tkinter.tix import IMAGE
import torch
import torchvision
import tarfile
import torch.nn as nn
import numpy as np
import torch.nn.functional as F
from torchvision.datasets.utils import download_url
from torchvision.datasets import ImageFolder
from torch.utils.data import DataLoader
import torchvision.transforms as tt
from torch.utils.data import random_split
from torchvision.utils import make_grid
import matplotlib
import matplotlib.pyplot as plt
from PIL import Image
# from google.colab import drive
# from google.colab import files
# %matplotlib inline

matplotlib.rcParams['figure.facecolor'] = '#ffffff'

def accuracy(outputs, labels):
    _, preds = torch.max(outputs, dim=1)
    return torch.tensor(torch.sum(preds == labels).item() / len(preds))

class ImageClassificationBase(nn.Module):
    def training_step(self, batch):
        images, labels = batch 
        out = self(images)                  # Generate predictions
        loss = F.cross_entropy(out, labels) # Calculate loss
        return loss
    
    def validation_step(self, batch):
        images, labels = batch 
        out = self(images)                    # Generate predictions
        loss = F.cross_entropy(out, labels)   # Calculate loss
        acc = accuracy(out, labels)           # Calculate accuracy
        return {'val_loss': loss.detach(), 'val_acc': acc}
        
    def validation_epoch_end(self, outputs):
        batch_losses = [x['val_loss'] for x in outputs]
        epoch_loss = torch.stack(batch_losses).mean()   # Combine losses
        batch_accs = [x['val_acc'] for x in outputs]
        epoch_acc = torch.stack(batch_accs).mean()      # Combine accuracies
        return {'val_loss': epoch_loss.item(), 'val_acc': epoch_acc.item()}
    
    def epoch_end(self, epoch, result):
        print("Epoch [{}], last_lr: {:.5f}, train_loss: {:.4f}, val_loss: {:.4f}, val_acc: {:.4f}".format(
            epoch, result['lrs'][-1], result['train_loss'], result['val_loss'], result['val_acc']))


def conv_block(in_channels, out_channels, pool=False):
    layers = [nn.Conv2d(in_channels, out_channels, kernel_size=3, padding=1), 
              nn.BatchNorm2d(out_channels), 
              nn.ReLU(inplace=True)]
    if pool: layers.append(nn.MaxPool2d(2))
    return nn.Sequential(*layers)

class ResNet9(ImageClassificationBase):
    def __init__(self, in_channels, num_classes):
        super().__init__()
        
        self.conv1 = conv_block(in_channels, 64)
        self.conv2 = conv_block(64, 128, pool=True)
        self.res1 = nn.Sequential(conv_block(128, 128), conv_block(128, 128))
        
        self.conv3 = conv_block(128, 256, pool=True)
        self.conv4 = conv_block(256, 512, pool=True)
        self.res2 = nn.Sequential(conv_block(512, 512), conv_block(512, 512))

        # self.conv5 = conv_block(512, 1024)
        # self.conv6 = conv_block(1024, 2048, pool=True)
        # self.res3 = nn.Sequential(conv_block(2048, 2048), conv_block(2048, 2048))
        
        self.classifier = nn.Sequential(nn.MaxPool2d(4), 
                                        nn.Flatten(), 
                                        nn.Dropout(0.5),
                                        nn.Linear(2*2*512, num_classes),
                                        # nn.Dropout(0.5),
                                        # nn.Linear(4096, 2048),
                                        # nn.Dropout(0.5),
                                        # nn.Linear(2048, num_classes)
                                        )
        
    def forward(self, xb):
        out = self.conv1(xb)
        out = self.conv2(out)
        out = self.res1(out) + out
        out = self.conv3(out)
        out = self.conv4(out)
        out = self.res2(out) + out
        # out = self.conv5(out)
        # out = self.conv6(out)
        # out = self.res3(out) + out
        out = self.classifier(out)
        return out


def get_default_device():
    """Pick GPU if available, else CPU"""
    if torch.cuda.is_available():
        return torch.device('cuda')
    else:
        return torch.device('cpu')
    
def to_device(data, device):
    """Move tensor(s) to chosen device"""
    if isinstance(data, (list,tuple)):
        return [to_device(x, device) for x in data]
    return data.to(device, non_blocking=True)

class DeviceDataLoader():
    """Wrap a dataloader to move data to a device"""
    def __init__(self, dl, device):
        self.dl = dl
        self.device = device
        
    def __iter__(self):
        """Yield a batch of data after moving it to device"""
        for b in self.dl: 
            yield to_device(b, self.device)

    def __len__(self):
        """Number of batches"""
        return len(self.dl)

device = get_default_device()

model = to_device(ResNet9(3, 2), device)
script_dir = os.path.dirname(__file__)
script_dir = script_dir + '/allcases-resnet9-85.pth'
# print(script_dir)
state_dict = torch.load(script_dir,map_location=device)
# print(script_dir)
# model = torch.load(script_dir,map_location=device)
model.load_state_dict(state_dict)
model.eval()
# print(model)

def getmodel():
    print(model)
    return model




def predict_image(img, model):
    script_dir = os.path.dirname(__file__)
    img = Image.open(script_dir + '/14.jpg')
    stats = ((0.3628, 0.3512, 0.3454), (0.3005, 0.2979, 0.2959))
    valid_tfms = tt.Compose([
                         tt.Resize(size=(64,64)),
                         tt.ToTensor(),
                         tt.Normalize(*stats)
                         ])

    img = valid_tfms(img)

    # Convert to a batch of 1
    xb = to_device(img.unsqueeze(0), device)
    # Get predictions from model
    yb = model(xb)
    # Pick index with highest probability
    _, preds  = torch.max(yb, dim=1)
    print(preds[0].item())
    # Retrieve the class label
    # return train_ds.classes[preds[0].item()]


# predict_image(img = None, model = model)

